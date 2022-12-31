import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Review {
  /**
   * Car review unique id
   */

  id: number;
  /**
   * Reference to the car
   */
  carId: number;
  /**
   * Number of ratings
   */

  rating?: number;
  /**
   * UserId of reviewer
   */

  userId: number;
  /**
   * names of reviewer
   */
  name?: string;
  /**
   * review desc
   */

  review?: string;
}
