import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Message {
  id: number;
  /**
   * returns true if a message is sent by a buyer else false if by the admin.
   */
  userId: number;
  message: string;

  chatId: number;

  createdAt: Date;
}
