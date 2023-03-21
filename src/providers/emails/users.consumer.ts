import { ConsumerService } from '@/providers/kafka/consumer/consumer.service';
import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class UsersConsumer implements OnModuleInit {
  constructor(private readonly consumer: ConsumerService) {}
  async onModuleInit() {
    await this.consumer.consume(
      'users.create',
      { topics: ['users.create'] },
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
  }
}
