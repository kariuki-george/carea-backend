import { InputType } from '@nestjs/graphql';
import { IsEmail, IsString, IsStrongPassword, Min } from 'class-validator';

@InputType()
export class CreateUserInput {
  /**
   * create user email. Must be unique.
   */
  @IsString()
  @IsEmail()
  email: string;

  /**
   * Users password. 8+ characters
   */
  @IsString()
  // @Min(8)
  // @IsStrongPassword()
  password: string;
}
