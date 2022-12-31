import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { PrismaService } from 'libs/database/prisma.service';

import { LoginResponse } from './res/login.res';
import { User, UserRoles } from './users/entities/user.entity';
import { UsersService } from './users/users.service';

export interface TokenPayload {
  userId: number;
  expires?: string;
  version: number;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
    private readonly prismaService: PrismaService
  ) {}
  async login(context: any): Promise<typeof LoginResponse> {
    try {
      const user: User = context.user;

      const tokenPayload: TokenPayload = {
        userId: user.id,
        expires: '5m',
        version: user.accessTokenVersion,
      };
      const token = this.jwtService.sign(tokenPayload);
      const expires = new Date();

      expires.setSeconds(
        expires.getSeconds() +
          this.configService.get<number>('REFRESH_JWT_EXPIRATION')
      );

      const refreshTokenPayload: TokenPayload = {
        userId: user.id,
        expires: '1d',

        version: user.refreshTokenVersion,
      };

      const refreshToken = this.jwtService.sign(refreshTokenPayload);
      const domain =
        this.configService.get<string>('NODE_ENV') === 'production'
          ? '.vercel.app'
          : 'localhost';
      context.res.cookie('rid', refreshToken, {
        httpOnly: true,
        expires,
        domain,
      });

      return {
        accessToken: token,
        user: {
          ...user,
        },
      };
    } catch (error) {
      return {
        error: true,
        message: error.message || error.response.message,
      };
    }
  }

  async refreshToken(req: Request, res: Response) {
    const cookie = req.cookies['rid'];
    /**
     * { userId: '62cfec0dbde7644a863df103',version... expires: '30d', iat: 1657869819 }
     */
    let payload: {
      userId: number;
      version: number;
      expires: string;
      iat: number;
    };
    try {
      payload = this.jwtService.verify(cookie, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });
    } catch (error) {
      if (error.message === 'invalid signature') {
        throw new UnauthorizedException('Cannot refresh your token');
      }
    }
    let user: User;

    //verify refreshToken version and update user
    try {
      user = await this.prismaService.user.update({
        where: { id: payload.userId },
        data: {
          accessTokenVersion: {
            increment: 1,
          },
        },
      });
    } catch (error) {
      user = null;
    }

    if (!user) {
      throw new UnauthorizedException('Cookie not valid');
    }

    if (user.refreshTokenVersion !== payload.version) {
      throw new UnauthorizedException('Cookie not valid');
    }

    //create accessToken
    const accessPayload: TokenPayload = {
      userId: user.id,
      version: user.accessTokenVersion,
      expires: '5m',
    };
    const accessToken = this.jwtService.sign(accessPayload);
    const expires = new Date();

    expires.setSeconds(
      expires.getSeconds() +
        this.configService.get<number>('REFRESH_JWT_EXPIRATION')
    );

    const refreshTokenPayload: TokenPayload = {
      userId: user.id,
      expires: '1hr',

      version: user.refreshTokenVersion,
    };

    const refreshToken = this.jwtService.sign(refreshTokenPayload);

    res.cookie('rid', refreshToken, {
      httpOnly: true,
      expires,
    });

    return res.json(accessToken);
  }

  async logout(res: Response, userId: number) {
    //clear refreshToken version
    try {
      if (userId) {
        await this.prismaService.user.update({
          where: { id: userId },
          data: {
            refreshTokenVersion: { increment: 1 },
            accessTokenVersion: { increment: 1 },
          },
        });
      }
    } catch (error) {}

    return res.cookie('rid', '', { expires: new Date(), httpOnly: true });
  }
}
