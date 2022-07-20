import { InputType } from '@nestjs/graphql';

@InputType()
export class CreateReviewInput {
  /**
   * The actual review
   */
  review?: string;
  /**
   * Reviewer unique id
   */
  userId: string;
  /**
   * Names of the review
   */
  name?: string;
  /**
   * Ratings
   */
  rating?: number;

  carId: string;
  id?:string
}
