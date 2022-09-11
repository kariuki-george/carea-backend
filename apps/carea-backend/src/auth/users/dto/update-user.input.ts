import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput {
  /**
   * Pass userId
   */
  userId: string;
  /**
   * firstname
   */
  firstName?: string;
  /**
   * lastname
   */
  lastName?: string;
  name: string;
  address: string;
}
