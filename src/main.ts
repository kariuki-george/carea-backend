import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  

  app.enableCors({
    credentials: true,
    origin: [
      'http://localhost:3000',
      'http://localhost:3100','https://studio.apollographql.com',
      '/.vercel.app$/',
      'https://ssl.kariukigeorge.me/graphql',
    ],
  });
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(parseInt(process.env.PORT) || 4000);
}
bootstrap();
