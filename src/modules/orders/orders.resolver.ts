import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateOrderInput, DeleteOrderInput } from './dto/order.dto';
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
  @Mutation(() => Boolean, {
    description: 'Takes in userId and orderId',
  })
  deleteOrder(@Args('deleteOrder') input: DeleteOrderInput): Promise<boolean> {
    return this.ordersService.deleteOrder(input.orderId, input.userId);
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
