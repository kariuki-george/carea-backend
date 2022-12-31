import { InputType } from '@nestjs/graphql';
import { IsInt } from 'class-validator';

@InputType()
export class CreateReviewInput {
  /**
   * The actual review
   */
  review?: string;
  /**
   * Reviewer unique id
   */
  @IsInt()
  userId: number;
  /**
   * Names of the review
   */
  name?: string;
  /**
   * Ratings
   */
  rating?: number;
  @IsInt()
  carId: number;
  @IsInt()
  id?: number;
}
