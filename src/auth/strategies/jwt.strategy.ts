import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { AuthenticationError } from 'apollo-server-express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { TokenPayload } from '../auth.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly usersService: UsersService
  ) {
    super({
      secretOrKey: configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
    });
  }

  async validate({ userId }: TokenPayload) {
    try {
      const user = await this.usersService.getUser({
        id: userId,
      });
      const { password, ...formattedUser } = user;

      return formattedUser;
    } catch (error) {
      throw new AuthenticationError('Not authenticated');
    }
  }
}
