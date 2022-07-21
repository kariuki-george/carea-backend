import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Category {
  /**
   * Category unique id
   */

  id: string;

  /**
   * Category name
   */

  name: string;

  /**
   * Category image url
   */

  imageUrl: string;
}
