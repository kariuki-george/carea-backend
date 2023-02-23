import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { PrismaService } from 'libs/database/prisma.service';

import { LoginResponse } from './res/login.res';
import { User } from './users/entities/user.entity';

export interface TokenPayload {
  userId: number;
  expires?: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService
  ) {}
  async login(context: any): Promise<typeof LoginResponse> {
    try {
      const user: User = context.user;
      const { accessToken, refreshToken } = await this.accessAndRefreshTokenGen(
        user.id
      );

      await this.prismaService.users.update({
        where: { id: user.id },
        data: { lastSignInAt: new Date() },
      });

      context.res.cookie('rid', refreshToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 24,
        secure: true,
        sameSite: false, //TODO: UPDATE FOR STRICTER SECURITY,
      });

      return {
        accessToken,
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

    // CHeck if token has expired or revoked
    const token = await this.prismaService.refreshTokens.findFirst({
      where: { AND: { userId: payload.userId, token: cookie } },
    });

    if (!token) {
      throw new NotFoundException("Refresh token doesn't exist");
    }

    if (token.revoked) {
      throw new BadRequestException('Token already revoked');
    }

    if (
      Date.parse(token.created_at.toString()) + 1000 * 60 * 60 * 24 >
      Date.now()
    ) {
      throw new BadRequestException('Token already expired');
    }

    const { accessToken, refreshToken } = await this.accessAndRefreshTokenGen(
      payload.userId
    );

    res.cookie('rid', refreshToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24,
      secure: true,
      sameSite: false, //TODO: UPDATE FOR STRICTER SECURITY
    });

    return res.json(accessToken);
  }

  private async accessAndRefreshTokenGen(userId: number) {
    // //create accessToken
    const accessPayload: TokenPayload = {
      userId,
      expires: '5m',
    };
    const accessToken = this.jwtService.sign(accessPayload);

    const refreshTokenPayload: TokenPayload = {
      userId,
    };

    const refreshToken = this.jwtService.sign(refreshTokenPayload);

    return { accessToken, refreshToken };
  }

  async logout(res: Response, userId: number) {
    //clear refreshToken version
    try {
      if (userId) {
        await this.prismaService.refreshTokens.updateMany({
          where: { id: userId, revoked: false },
          data: { revoked: true },
        });
      }
    } catch (error) {}

    return res.cookie('rid', '', { maxAge: 0, httpOnly: true });
  }
}
