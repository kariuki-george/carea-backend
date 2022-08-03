import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.enableCors({
  //   credentials: true,
  //   origin: [
  //     'http://localhost:3000',
  //     'http://localhost:3100',
  //     '/.vercel.app$/',
  //   ],
  // });
  app.use(cookieParser());
  await app.listen(parseInt(process.env.PORT) || 4000);
}
bootstrap();
