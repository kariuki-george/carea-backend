import { ConsumerService } from '@/providers/kafka/consumer/consumer.service';
import { Injectable, OnModuleInit } from '@nestjs/common';
import events from '@/config/kafka.events';

@Injectable()
export class UsersConsumer implements OnModuleInit {
  constructor(private readonly consumer: ConsumerService) {}
  async onModuleInit() {
    await this.consumer.consume(
      'users',
      { topics: [events.USER.CREATE] },
      {
        eachMessage: async ({ topic, partition, message }) => {
          console.log({
            source: 'users.create',
            message: message.value.toString(),
            partition,
            topic,
          });
          console.log('From Email Service');
        },
      }
    );

    await this.consumer.consume(
      'users',
      { topics: [events.USER.VERIFYEMAIL] },
      {
        eachMessage: async ({ topic, partition, message }) => {
          console.log({
            source: 'users.verify',
            message: message.value.toString(),
            partition,
            topic,
          });
          console.log('From Email Service');
        },
      }
    );
    await this.consumer.consume(
      'users',
      { topics: [events.USER.PASSWORDRESETREQUEST] },
      {
        eachMessage: async ({ topic, partition, message }) => {
          console.log({
            source: 'users.password',
            message: message.value.toString(),
            partition,
            topic,
          });
          console.log('From Email Service');
        },
      }
    );
  }
}
