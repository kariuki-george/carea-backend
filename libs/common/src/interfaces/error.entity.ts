import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ErrorInterface {
  /**
   * check if an error exists
   */
  error: boolean;
  /**
   * error message
   */
  message: string;
}
