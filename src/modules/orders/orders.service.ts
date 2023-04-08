import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/providers/database/prisma.service';
import { CreateOrderInput } from './dto/createOrder.dto';
import { Order } from './entities/Order.entity';

@Injectable()
export class OrdersService {
  constructor(private prismaService: PrismaService) {}

  async createOrder(data: CreateOrderInput): Promise<Order> {
    const order = await this.prismaService.orders.create({ data });

    return order;
  }

  getOrders(): Promise<Order[]> {
    return this.prismaService.orders.findMany();
  }
  getOrdersByUserId(userId: number): Promise<Order[]> {
    return this.prismaService.orders.findMany({ where: { userId } });
  }
}
