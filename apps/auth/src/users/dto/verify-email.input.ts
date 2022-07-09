import { InputType } from '@nestjs/graphql';

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
  email: string;
}
