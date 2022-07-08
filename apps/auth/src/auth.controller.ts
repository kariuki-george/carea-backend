import { Controller, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt.guard';
import { User } from './users/entities/user.entity';
import { Whoami } from './whoami.decorator';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AUthController {
  @UseGuards(JwtAuthGuard)
  @MessagePattern('validate_user')
  async validateUser(@Whoami(true) user: User) {
    return user;
  }
}
