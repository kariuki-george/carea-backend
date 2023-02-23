import {  ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Category {
  /**
   * Category unique id
   */

  id: number;

  /**
   * Category name
   */

  name: string;

  /**
   * Category image url
   */

  imageUrl: string;
}
