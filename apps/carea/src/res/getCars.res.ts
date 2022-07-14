import { Field, ObjectType } from '@nestjs/graphql';
import { Car } from '../entities/car.entity';

@ObjectType()
export class GetCarsResponse {
  @Field(() => String || Boolean)
  nextPage: string | boolean;
  @Field(() => [Car])
  cars: Car[];
}
