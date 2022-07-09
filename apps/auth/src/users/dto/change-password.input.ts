import { InputType } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';

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
  password: string;
}
