import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule)
  await app.startAllMicroservices()
  await app.listen(4010)
}
bootstrap();
