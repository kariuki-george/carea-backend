import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/providers/database/prisma.service';
import { CreateOrderInput } from './dto/order.dto';
import { Order } from './entities/Order.entity';
import { Cache } from 'cache-manager';
import { ORDER_NOT_FOUND } from '@/errors/orders';

@Injectable()
export class OrdersRepo {
  constructor(
    private prismaService: PrismaService,
    @Inject(CACHE_MANAGER) private cacheService: Cache
  ) {}

  async createOrder(data: CreateOrderInput): Promise<Order> {
    const order = await this.prismaService.orders.create({ data });
    await this.cacheService.del('orders-' + data.userId);
    return order;
  }

  async getOrders(): Promise<Order[]> {
    const cachedOrders: Order[] = await this.cacheService.get('orders');
    if (cachedOrders) return cachedOrders;
    const orders = await this.prismaService.orders.findMany();
    await this.cacheService.set('orders', orders, 5 * 1000 * 60);
    return orders;
  }

  async getOrdersByUserId(userId: number): Promise<Order[]> {
    const cachedOrders: Order[] = await this.cacheService.get(
      'orders-' + userId
    );
    if (cachedOrders) return cachedOrders;

    const orders = await this.prismaService.orders.findMany({
      where: { userId },
    });
    await this.cacheService.set('orders-' + userId, orders, 5 * 1000 * 60);
    return orders;
  }
  async deleteOrder(orderId: number, userId: number): Promise<boolean> {
    try {
      await this.prismaService.orders.delete({
        where: { id: orderId },
      });
      await this.cacheService.del('orders-' + userId);
      await this.cacheService.del('orders');
      return true;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(ORDER_NOT_FOUND);
      }
    }
  }
}
