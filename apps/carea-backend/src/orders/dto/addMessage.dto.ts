import { InputType } from '@nestjs/graphql';

@InputType()
export class AddMessageInput {
  message: string;
  chatId: string;
  userId: string;
}
