import { InputType } from '@nestjs/graphql';
import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

/**
 * Change user password input.
 */
@InputType()
export class ChangePasswordDto {
  @IsString()
  /**
   * Token provided from the change password url
   */
  token: string;
  /**
   * User's password
   */
  @IsEmail()
  email: string;
  /**
   * New password
   */

  @IsString()
  @IsStrongPassword({ minLength: 8 })
  password: string;
}
