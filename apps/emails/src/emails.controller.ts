import { Controller, Get, UseGuards } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { EmailsService } from './emails.service';

@Controller()
export class EmailsController {
  constructor(private readonly emailsService: EmailsService) {}

  @EventPattern('user_verifyEmail')
  async handleUserVerifyEmail(
    @Payload() data: any,
    @Ctx() context: RmqContext
  ) {
    const input = JSON.parse(data);

    this.emailsService.sendUserConfirmation({
      ...input.data,
    },context);
  }
}
