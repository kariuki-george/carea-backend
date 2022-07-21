import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { EmailsService } from './emails.service';

@Controller()
export class EmailsController {
  constructor(private readonly emailsService: EmailsService) {}

  @RabbitRPC({
    exchange: 'EMAIL',
    routingKey: 'user_verifyEmail',
    queue: 'EMAIL',
  })
  handleUserVerifyEmail(data: any) {
    console.log(data);
    console.log('hi');
    return this.emailsService.sendUserConfirmation(data);
  }

  @RabbitRPC({
    exchange: 'EMAIL',
    routingKey: 'user_passwordReset',
    queue: 'EMAIL',
  })
  handleChangePasswordRequest(data: any) {
    return this.emailsService.sendChangePassword(data);
  }
}
