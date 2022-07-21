import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),

    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
      }),
      inject: [ConfigService],
    }),

    AuthModule,
    UsersModule,
  ],
  providers: [AuthService, AuthResolver, JwtStrategy, LocalStrategy],
  exports: [PassportModule],
})
export class AuthModule {}
