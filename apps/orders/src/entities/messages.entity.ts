import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Message {
  id: string;
  /**
   * returns true if a message is sent by a buyer else false if by the admin.
   */
  buyer: boolean;
  message: string;

  chatId: string;

  createdAt: Date;
}
