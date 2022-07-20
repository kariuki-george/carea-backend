import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { RmqModule } from 'libs/rmq/rmq.module';
import { join } from 'path';
import { EmailsController } from './emails.controller';
import { EmailsService } from './emails.service';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { AuthModule } from 'libs/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_EMAIL_QUEUE: Joi.string().required(),
      }),
      envFilePath: './apps/emails/.env',
    }),
    RmqModule,
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('MAIL_HOST'),
          port: configService.get<number>('MAIL_PORT'),
          secure: false,
          auth:{
          
              user: configService.get<string>('MAIL_USER'),
              pass: configService.get<string>('MAIL_PASSWORD'),
        
          }
          
        },
        defaults: {
          from: configService.get<string>('MAIL_FROM'),
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
    AuthModule
  ],
  controllers: [EmailsController],
  providers: [EmailsService],
})
export class EmailsModule {}
