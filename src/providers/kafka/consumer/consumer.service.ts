import {
  Injectable,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConsumerSubscribeTopics } from '@nestjs/microservices/external/kafka.interface';
import { Consumer, ConsumerRunConfig, Kafka } from 'kafkajs';
@Injectable()
export class ConsumerService implements OnModuleInit, OnApplicationShutdown {
  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    console.log('Hi from consumer');
  }

  async onApplicationShutdown() {
    for (const consumer of this.consumers) {
      await consumer.disconnect();
    }
  }

  private readonly kafka = new Kafka({
    brokers: [this.configService.getOrThrow('KAFKA_URI')],
  });

  private readonly consumers: Consumer[] = [];

  async consume(
    groupId: string,
    topic: ConsumerSubscribeTopics,
    config: ConsumerRunConfig
  ) {
    const consumer: Consumer = this.kafka.consumer({ groupId });

    await consumer.connect();
    await consumer.subscribe(topic);
    await consumer.run(config);
    this.consumers.push(consumer);
  }
}
