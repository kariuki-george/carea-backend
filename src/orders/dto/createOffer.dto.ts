import { Field, InputType, Int } from '@nestjs/graphql';
import { IsPositive } from 'class-validator';

@InputType()
export class CreateOfferInput {
  userId: string;
  carId: string;
  @IsPositive()
  @Field(() => Int)
  amount: number;
}
