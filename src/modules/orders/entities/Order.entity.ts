import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';

enum OrderStatus {
  UNPAID = 'UNPAID',
  PAID = 'PAID',
}

registerEnumType(OrderStatus, { name: 'OrderStatus' });

@ObjectType()
export class Order {
  id: number;
  userId: number;
  addressId: number;
  @Field(() => OrderStatus)
  status: string;
  carId: number;
}
