import { InputType } from '@nestjs/graphql';
import { IsEmail, IsInt, IsOptional } from 'class-validator';

@InputType()
export class SearchUserInput {
  @IsEmail()
  @IsOptional()
  email?: string;
  @IsInt()
  @IsOptional()
  id?: number;
}
