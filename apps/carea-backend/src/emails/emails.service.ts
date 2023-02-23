import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
// import { RmqService } from 'libs/rmq/rqm.service';

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

  @RabbitSubscribe({
    exchange: 'EMAIL',
    routingKey: 'user_verifyEmail',
    queue: 'EMAIL-VERIFYUSER',
  })
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

  @RabbitSubscribe({
    exchange: 'EMAIL',
    routingKey: 'user_passwordReset',
    queue: 'EMAIL-PASSWORDRESET',
  })
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

  @RabbitSubscribe({
    exchange: 'OFFER',
    routingKey: 'OFFERCREATED',
    queue: 'OFFER-OFFERCREATED',
  })
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

  @RabbitSubscribe({
    exchange: 'OFFER',
    routingKey: 'OFFERUPDATED',
    queue: 'OFFER-OFFERUPDATED',
  })
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
