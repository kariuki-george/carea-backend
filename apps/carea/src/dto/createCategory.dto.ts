import { InputType } from '@nestjs/graphql';
import { IsString, IsUrl } from 'class-validator';

@InputType()
export class CreateCategoryInput {
  /**
   * Name must be unique.
   */
  @IsString()
  name: string;

  /**
   * imageUrl
   */
  @IsString()
  @IsUrl()
  imageUrl: string;
}
