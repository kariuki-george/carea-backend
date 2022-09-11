import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import {} from 'libs/rmq/rqm.service';
import { RmqModule } from 'libs/rmq/rmq.module';

@Module({
  providers: [UsersResolver, UsersService],
  exports: [UsersService],
  imports: [RmqModule],
})
export class UsersModule {}
