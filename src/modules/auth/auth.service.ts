import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/providers/database/prisma.service';

import { User } from '../users/entities/user.entity';

export interface TokenPayload {
  userId: number;
  expires?: string;
}

interface LoginResponse {
  accessToken: string;
  user: User;
  refreshToken: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService
  ) {}
  async login(user: User): Promise<LoginResponse> {
    const { accessToken, refreshToken } = await this.accessAndRefreshTokenGen(
      user.id
    );

    await this.prismaService.users.update({
      where: { id: user.id },
      data: {
        lastSignInAt: new Date(),
        refreshToken,
      },
    });

    return {
      accessToken,
      user,
      refreshToken,
    };
  }

  async refreshToken(cookie: string): Promise<Partial<LoginResponse>> {
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
        throw new UnauthorizedException('Invalid refresh token');
      }
    }

    // Check if token has expired or revoked
    const user = await this.prismaService.users.findUnique({
      where: { id: payload.userId },
    });

    if (!user.refreshToken) {
      throw new NotFoundException("Refresh token doesn't exist");
    }

    if (user.refreshToken != cookie) {
      throw new ForbiddenException('Refresh token is not valid');
    }
    const newTokens = await this.accessAndRefreshTokenGen(payload.userId);

    await this.prismaService.users.update({
      where: { id: payload.userId },
      data: { refreshToken: newTokens.refreshToken },
    });

    return newTokens;
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

  logout(userId: number) {
    return this.prismaService.users.update({
      where: { id: userId },
      data: { refreshToken: null },
    });
  }
}
