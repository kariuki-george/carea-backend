// import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailsService {
  async sendUserConfirmation(email: string) {
    try {
      console.log('User Created Email' + email);
    } catch (error) {
      throw new Error(error);
    }
  }

  async sendChangePassword(email: string) {
    try {
      console.log('User Changed Password' + JSON.stringify(email));
    } catch (error) {
      throw new Error(error);
    }
  }
}
