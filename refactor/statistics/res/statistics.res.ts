import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class StatisticsRes {
  orders: number;
  users: number;
  cars: number;
}
