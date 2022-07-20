import { CacheModule, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { RmqModule } from 'libs/rmq/rmq.module';
import { EMAIL_SERVICE } from './constants/services';
import { AuthModule } from 'libs/auth/auth.module';
import { PrismaService } from './prisma.service';

@Module({
  providers: [UsersResolver, UsersService, PrismaService],
  exports: [UsersService],
  imports: [
    
    RmqModule.register({
      name: EMAIL_SERVICE,
    }),
    CacheModule.register(),
    AuthModule,
  ],
})
export class UsersModule {}
