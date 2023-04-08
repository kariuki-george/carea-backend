import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateOrderInput } from './dto/createOrder.dto';
import { Order } from './entities/Order.entity';
import { OrdersService } from './orders.service';

@Resolver()
export class OrdersResolver {
  constructor(private readonly ordersService: OrdersService) {}

  @Mutation(() => Order, {
    description: 'Takes in an optional token argument',
  })
  createOrder(@Args('createOrder') input: CreateOrderInput): Promise<Order> {
    return this.ordersService.createOrder(input);
  }

  @Query(() => [Order])
  getOrders(): Promise<Order[]> {
    return this.ordersService.getOrders();
  }
  @Query(() => [Order])
  getOrdersByUserId(@Args('UserId') userId: number): Promise<Order[]> {
    return this.ordersService.getOrdersByUserId(userId);
  }
}
