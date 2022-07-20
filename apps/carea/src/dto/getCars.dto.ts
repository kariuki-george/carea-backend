import { Field, InputType, Int } from '@nestjs/graphql';
import { IsOptional, IsPositive, IsString } from 'class-validator';
import { Category } from '../entities/category.entity';
import { CreateCarInput } from './createCar.dto';

@InputType()
export class GetCarsInput {
  /**
   * This is the objectId first document in a page. If its the first page, the startIndex is null else the nextIndex provided be the last page.
   */
  @Field(() => String, { nullable: true })
  startIndex: string | null;
  /**
   * Limit of how many documents are needed per page
   */
  @IsPositive()
  @Field(() => Int)
  limit: number;

  name?: string;
  categoryName?: string;
}
