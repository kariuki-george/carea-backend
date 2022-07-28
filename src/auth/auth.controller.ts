import { Controller, Get, Req } from "@nestjs/common";
import { Request } from "express";
import {AuthService} from "./auth.service"

@Controller()
export class AuthController{
 constructor(private readonly authService:AuthService){}
 @Get("/refresh")
 async refreshToken(
     @Req() req:Request
 ){
return this.authService.refreshToken(req)
}

}