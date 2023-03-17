import { createUnionType, Field, ObjectType } from '@nestjs/graphql';
import { Car } from '../entities/car.entity';
import { GraphQLError } from 'graphql';

@ObjectType()
class CarRes {
  @Field(() => Car)
  car: Car;
}
export const CarResponse = createUnionType({
  name: 'CarResponse',
  description:
    'Return error and Car union. Resolve error with error field and resolve Car with name field',
  types: () => [Error, CarRes] as const,
  resolveType(value) {
    if (value.car) {
      return CarRes;
    }
    if (value.error) {
      return  {error:boolean;message:string};
    }
    return null;
  },
});
