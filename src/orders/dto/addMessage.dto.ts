import { InputType } from '@nestjs/graphql';

@InputType()
export class AddMessageInput {
  buyer?: boolean;
  message: string;
  chatId: string;
}
