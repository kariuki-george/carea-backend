import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Car } from './car.entity';

@ObjectType()
export class Review  {
  /**
   * Car review unique id
   */

  id: string;
  /**
   * Reference to the car
   */
  carId:string;
  /**
   * Number of ratings
   */
 
  rating?: number;
  /**
   * UserId of reviewer
   */

  userId: string;
  /**
   * names of reviewer
   */
 name?: string;
  /**
   * review desc
   */
  
  review?: string;
}
