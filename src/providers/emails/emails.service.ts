import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

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
}
@Injectable()
export class EmailsService {
  constructor(private readonly mailerService: MailerService) {}

  async sendUserConfirmation(user: Partial<User>) {
    const url = `http:localhost:3000/auth/verify?token=${user.token}&email=${user.email}`;
    try {
      return await this.sendEmail({
        to: user.email,
        subject: 'Welcome to Carea! Confirm your Email',

        template: '../src/emails/templates/confirmation',
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
  }: SendEmailInput) {
    await this.mailerService.sendMail({
      to,
      subject,
      template,
      context: templateContext,
    });
    //this.rmqService.ack(context);
  }

  async sendChangePassword(user: Partial<User>) {
    const url = `http:localhost:3000/auth/change-password?token=${user.token}&email=${user.email}`;
    try {
      return await this.sendEmail({
        to: user.email,

        subject: 'Carea: Change Password Request!',
        templateContext: {
          url,
          name: user.email,
        },
        template: '../src/emails/templates/changePassword',
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async offerCreatedEmail(data: any) {
    try {
      return await this.sendEmail({
        to: data.email,

        subject: '[Carea]: Offer to buy a car!',
        templateContext: {
          name: data.email,
          car: data.car,
          amount: data.amount,
        },
        template: '../src/emails/templates/offerCreated',
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async offerUpdatedEmail(data: any) {
    try {
      return await this.sendEmail({
        to: data.email,

        subject: '[Carea]: Offer has been updated!',
        templateContext: {
          name: data.email,
          car: data.car,
          amount: data.amount,
          status: data.status,
        },
        template: '../src/emails/templates/offerUpdated',
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
