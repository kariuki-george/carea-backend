import {
  Injectable,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Kafka, Producer, ProducerRecord } from 'kafkajs';

@Injectable()
export class ProducerService implements OnModuleInit, OnApplicationShutdown {
  constructor(private readonly configService: ConfigService) {}
  async onModuleInit() {
    await this.producer.connect();
  }

  async onApplicationShutdown() {
    await this.producer.disconnect();
  }

  private readonly kafka = new Kafka({
    brokers: [this.configService.getOrThrow('KAFKA_URI')],
  });
  private readonly producer: Producer = this.kafka.producer();

  async produce(record: ProducerRecord) {
    await this.producer.send(record);
  }
}
