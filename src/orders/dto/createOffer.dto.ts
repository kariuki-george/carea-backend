import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt,  IsPositive } from 'class-validator';

@InputType()
export class CreateOfferInput {
  @IsInt()
  carId: number;
  @IsPositive()
  @Field(() => Int)
  @IsInt()
  amount: number;
 
}
