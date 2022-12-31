import { Field, ObjectType } from '@nestjs/graphql';
import { Car } from '../entities/car.entity';

@ObjectType()
export class GetCarsResponse {
  @Field(() => String || Boolean)
  nextPage: number | boolean;
  @Field(() => [Car])
  cars: Car[];
}
