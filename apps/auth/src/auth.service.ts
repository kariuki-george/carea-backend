import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { LoginResponse } from './res/login.res';

export interface TokenPayload {
  userId: string;
  expires?: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}
  async login(context: any): Promise<typeof LoginResponse> {
    try {
      const user = context.user;
      const tokenPayload: TokenPayload = {
        userId: user._id.toHexString(),
        expires: '30m',
      };
      const token = this.jwtService.sign(tokenPayload);
      const expires = new Date();

      expires.setSeconds(
        expires.getSeconds() +
          this.configService.get<number>('REFRESH_JWT_EXPIRATION')
      );

      const refreshTokenPayload: TokenPayload = {
        userId: user._id.toHexString(),
        expires: '30d',
      };

      const refreshToken = this.jwtService.sign(refreshTokenPayload);

      context.res.cookie('rid', refreshToken, {
        httpOnly: true,
        expires,
      });

      return {
        accessToken: token,
        user,
      };
    } catch (error) {
      return {
        error: true,
        message: error.message || error.response.message,
      };
    }
  }
}
