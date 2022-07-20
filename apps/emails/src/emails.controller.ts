import { Controller,  } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { EmailsService } from './emails.service';

@Controller()
export class EmailsController {
  constructor(private readonly emailsService: EmailsService) {}

  @EventPattern('user_verifyEmail')
  handleUserVerifyEmail(@Payload() data: any, @Ctx() context: RmqContext) {
    return this.emailsService.sendUserConfirmation(data, context);
  }

  @EventPattern('user_passwordReset')
  handleChangePasswordRequest(
    @Payload() data: any,
    @Ctx() context: RmqContext
  ) {
    return this.emailsService.sendChangePassword(data, context);
  }
}
