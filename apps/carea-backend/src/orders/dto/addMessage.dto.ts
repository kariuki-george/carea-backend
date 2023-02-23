import { InputType } from '@nestjs/graphql';
import { IsInt } from 'class-validator';

@InputType()
export class AddMessageInput {
  message: string;
  @IsInt()
  chatId: number;
  userId: number;
}
