import { InputType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

/**
 * Verify user email
 */
@InputType()
export class VerifyEmailDto {
  /**
   * Token passed in verify user email
   */
  token: string;
  /**
   * User email
   */
  @IsEmail()
  email: string;
}
