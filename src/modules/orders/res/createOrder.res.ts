import { Field, ObjectType } from '@nestjs/graphql';
import { Offer } from '../entities/Offer.entity';
import { Order } from '../entities/Order.entity';

@ObjectType()
export class AddOffer {
  @Field(() => Offer)
  offer?: Offer;
  error?: boolean;
  message?: string;
}

@ObjectType()
export class CreateOrderResponse {
  @Field(() => Order)
  order: Order;

  @Field(() => AddOffer)
  offer?: AddOffer;
}
