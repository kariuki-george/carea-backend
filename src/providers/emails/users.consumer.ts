import { ConsumerService } from '@/providers/kafka/consumer/consumer.service';
import { Injectable, OnModuleInit } from '@nestjs/common';
import events from '@/config/kafka.events';
import { EmailsService } from './emails.service';

@Injectable()
export class UsersConsumer implements OnModuleInit {
  constructor(
    private readonly consumer: ConsumerService,
    private readonly emailService: EmailsService
  ) {}
  async onModuleInit() {
    await this.consumer.consume(
      'emails',
      { topics: [events.USER.CREATE] },
      {
        eachMessage: async ({ message }) => {
          return this.emailService.sendUserConfirmation(
            JSON.parse(message.value.toString()).email
          );
        },
      }
    );

    await this.consumer.consume(
      'users',
      { topics: [events.USER.PASSWORDRESETREQUEST] },
      {
        eachMessage: async ({ message }) => {
          return this.emailService.sendChangePassword(
            JSON.parse(message.value.toString()).EMAIL
          );
        },
      }
    );
  }
}
