import { Module } from '@nestjs/common';
import { EmailsService } from './emails.service';

import { UsersConsumer } from './users.consumer';

@Module({
  providers: [EmailsService, UsersConsumer],
})
export class EmailsModule {}
