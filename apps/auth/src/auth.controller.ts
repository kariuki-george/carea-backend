import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt.guard';
import { User } from './users/entities/user.entity';
import { Whoami } from './whoami.decorator';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AuthController {
  @Get()
  getHello() {
    return 'hi';
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern('validate_user')
  async validateUser(@Whoami() user: User) {
    return user;
  }
}
