import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsPositive } from 'class-validator';

@InputType()
export class GetCarsInput {
  /**
   * This is the objectId first document in a page. If its the first page, the startIndex is null else the nextIndex provided be the last page.
   */
  @Field(() => Int)
  @IsInt()
  startIndex: number;
  /**
   * Limit of how many documents are needed per page
   */
  @IsPositive()
  @Field(() => Int)
  limit: number;

  name?: string;
  categoryName?: string;
}
