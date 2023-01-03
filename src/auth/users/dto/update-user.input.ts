import { InputType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateUserInput {
  /**
   * firstname
   */
  @IsString()
  @IsOptional()
  firstName?: string;
  /**
   * lastname
   */
  @IsString()
  @IsOptional()
  lastName?: string;
}
