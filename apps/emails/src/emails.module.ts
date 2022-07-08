import { Module } from '@nestjs/common';
import { RmqModule } from 'libs/rmq/rmq.module';
import { EmailsController } from './emails.controller';
import { EmailsService } from './emails.service';

@Module({
  imports: [RmqModule],
  controllers: [EmailsController],
  providers: [EmailsService],
})
export class EmailsModule {}
