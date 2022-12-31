import { InputType } from '@nestjs/graphql';
import { IsInt } from 'class-validator';

@InputType()
export class UpdateUserInput {
  /**
   * Pass userId
   */
  @IsInt()
  userId: number;
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
