import { InputType } from '@nestjs/graphql';
import { IsInt } from 'class-validator';

@InputType()
export class CreateChatInput {
  @IsInt()
  userId: number;
  @IsInt()
  carId: number;
}
