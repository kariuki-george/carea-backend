import { NestFactory } from '@nestjs/core';
import { RmqOptions } from '@nestjs/microservices';
import { RmqService } from 'libs/rmq/rqm.service';
import { EmailsModule } from './emails.module';

async function bootstrap() {
  const app = await NestFactory.create(EmailsModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice<RmqOptions>(rmqService.getOptions('EMAIL', true));
  app.startAllMicroservices();
}
bootstrap();
