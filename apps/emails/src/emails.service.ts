import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { RmqContext } from '@nestjs/microservices';
import { RmqService } from 'libs/rmq/rqm.service';

interface User {
  email: string;
  name?: string;
  token: string;
}
@Injectable()
export class EmailsService {
  constructor(
    private readonly mailerService: MailerService,

    private readonly rmqService: RmqService
  ) {}

  async sendUserConfirmation(user, context: RmqContext) {
    const url = `http:localhost:3100/auth/confirm?token=${user.token}`;
    try {
      await this.mailerService.sendMail({
        to: user.email,
        subject: 'Welcome to Carea! Confirm your Email',
        template: './confirmation',
        context: {
          name: 'user.name',
          url,
        },
      });
      this.rmqService.ack(context);
    } catch (error) {
      throw new Error(error);
    }
  }
}
