import { InputType } from '@nestjs/graphql';
import { IsInt } from 'class-validator';

@InputType()
export class SearchUserInput {
  email?: string;
  @IsInt()
  id?: number;
}
