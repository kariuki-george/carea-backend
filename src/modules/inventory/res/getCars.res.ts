import { Field, ObjectType, Int } from '@nestjs/graphql';
import { Car } from '../entities/car.entity';

@ObjectType()
export class GetCarsResponse {
  @Field(() => Int, {
    description:
      'Returns zero if no next page. Else returns index for the next page',
  })
  nextPage: number;
  @Field(() => [Car])
  cars: Car[];
}
