import { InputType } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';

@InputType()
export class LoginInputDto {
  @IsString()
  @IsEmail()
  email: string;
  @IsString()
  password: string;
}
