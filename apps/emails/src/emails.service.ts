import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { RmqContext } from '@nestjs/microservices';
import { RmqService } from 'libs/rmq/rqm.service';

interface User {
  email: string;
  name: string;
  token: string;
}

interface SendEmailInput {
  to: string;
  subject: string;
  template: string;
  templateContext: {};
  context: RmqContext;
}
@Injectable()
export class EmailsService {
  constructor(
    private readonly mailerService: MailerService,

    private readonly rmqService: RmqService
  ) {}

  async sendUserConfirmation(user: Partial<User>, context: RmqContext) {
    const url = `http:localhost:3100/auth/confirm?token=${user.token}?email=${user.email}`;
    try {
      await this.sendEmail({
        to: user.email,
        subject: 'Welcome to Carea! Confirm your Email',
        context,
        template: './confirmation',
        templateContext: {
          name: user.name,
          url,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }
  private async sendEmail({
    to,
    subject,
    template,
    templateContext,
    context,
  }: SendEmailInput) {
    await this.mailerService.sendMail({
      to,
      subject,
      template,
      context: templateContext,
    });
    this.rmqService.ack(context);
  }

  async sendChangePassword(user: Partial<User>, context: RmqContext) {
    const url = `http:localhost:3100/auth/change-password?token=${user.token}?email=${user.email}`;
    try {
      await this.sendEmail({
        to: user.email,
        context,
        subject: 'Carea: Change Password Request!',
        templateContext: {
          url,
          name: user.email,
        },
        template: './changePassword',
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
