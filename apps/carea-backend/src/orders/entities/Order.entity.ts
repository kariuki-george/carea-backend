import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';

enum OrderStatus {
  PROCESSING = 'PROCESSING',
  DELIVERY = 'DELIVERY',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  REFUND = 'REFUND',
  UNPAID = 'UNPAID',
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
