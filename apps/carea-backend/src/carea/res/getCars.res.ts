import { Field, ObjectType, Int } from '@nestjs/graphql';
import { Car } from '../entities/car.entity';

@ObjectType()
export class GetCarsResponse {
  @Field(() => Int || Boolean)
  nextPage: number | boolean;
  @Field(() => [Car])
  cars: Car[];
}
