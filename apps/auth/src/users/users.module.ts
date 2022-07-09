import { CacheModule, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { UsersRepo } from './users.repository';
import { RmqModule } from 'libs/rmq/rmq.module';
import { EMAIL_SERVICE } from './constants/services';
import { AuthModule } from 'libs/auth/auth.module';

@Module({
  providers: [UsersResolver, UsersService, UsersRepo],
  exports: [UsersService],
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    RmqModule.register({
      name: EMAIL_SERVICE,
    }),
    CacheModule.register(),
    AuthModule,
  ],
})
export class UsersModule {}
