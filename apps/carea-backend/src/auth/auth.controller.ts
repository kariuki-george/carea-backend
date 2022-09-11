import { Controller, Get, Param, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get('/refresh')
  async refreshToken(@Req() req: Request, @Res() res: Response) {
    return this.authService.refreshToken(req, res);
  }
  @Get('logout/:userId')
  async logout(@Res() res: Response, @Param('userId') userId: string) {
    return this.authService.logout(res, userId.split('=')[1]);
  }
}
