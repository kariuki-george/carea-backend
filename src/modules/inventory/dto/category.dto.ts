import { InputType, PartialType } from '@nestjs/graphql';
import { IsString, IsUrl, IsInt } from 'class-validator';

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

@InputType()
export class UpdateCategoryInput extends PartialType(CreateCategoryInput) {
  @IsInt()
  categoryId: number;
}
