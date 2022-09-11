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
  id: string;
  userId: string;
  addressId: string;
  @Field(() => OrderStatus)
  status: string;
  carId: string;
}
