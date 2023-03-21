import {
  Injectable,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import { Kafka, Producer, ProducerRecord } from 'kafkajs';

@Injectable()
export class ProducerService implements OnModuleInit, OnApplicationShutdown {
  async onModuleInit() {
    this.producer.connect();
  }

  async onApplicationShutdown() {
    await this.producer.disconnect();
  }

  private readonly kafka = new Kafka({
    brokers: ['broker:9092'],
  });
  private readonly producer: Producer = this.kafka.producer();

  async produce(record: ProducerRecord) {
    await this.producer.send(record);
  }
}
