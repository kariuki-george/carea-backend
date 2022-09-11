import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';

export enum CarCondition {
  NEW="NEW",
  USED="USED",
}

registerEnumType(CarCondition, {
  name: 'CarCondition',
});

@ObjectType()
export class Car {
  /**
   * Car's unique id
   */

  id: string;
  /**
   * Car's name, Should be unique
   */
  name: string;

  /**
   * Car ondition, used, new, etc
   */
  @Field(() => CarCondition)
  condition: string;
  /**
   * Car's price
   */
  price: number;

  /**
   * Stock: Returns the amount in stock, ready for purchase.
   */
  @Field(() => Int)
  stock: number;
  /**
   * This is the main image url
   */
  imageUrl: string;
  /**
   * Car's description
   */
  desc: string;

  /**
   * Check whether the car is ready for sale, if true, the car will be returned to buyers for buying
   */
  publish?: boolean;

  /**
   * checkout: Check's whether the car has been added to cart by a buyer buy the purchase process is not complete. If true, The car will not be shown to potential buyers.
   */
  checkout?: boolean;
  @Field(() => [String], { description: 'Other image urls' })
  gallery?: string[];

  categoryId: string;
}

@ObjectType()
export class CarProps {
  name: string;
  imageUrl: string;
}

