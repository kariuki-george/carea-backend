import { NestFactory } from '@nestjs/core';
import { RmqOptions } from '@nestjs/microservices';
import { RmqService } from 'libs/rmq/rqm.service';
import { AuthModule } from './auth.module';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice<RmqOptions>(rmqService.getOptions('AUTH', true));
  //app.useGlobalPipes(new ValidationPipe());
  app.startAllMicroservices();
  await app.listen(4010);
}
bootstrap();
