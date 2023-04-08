import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrderInput } from './dto/order.dto';
import { Order } from './entities/Order.entity';
import { OrdersRepo } from './orders.repo';
import { InventoryService } from '../inventory/inventory.service';
import { CAR_OUT_OF_STOCK } from '@/errors/orders';

@Injectable()
export class OrdersService {
  constructor(
    private ordersRepo: OrdersRepo,
    private readonly inventoryService: InventoryService
  ) {}

  async createOrder(data: CreateOrderInput): Promise<Order> {
    // Make sure the car is in stock
    const car = await this.inventoryService.getCarById(data.carId);

    if (car.stock === 0) {
      throw new BadRequestException(CAR_OUT_OF_STOCK);
    }

    const order = await this.ordersRepo.createOrder(data);
    return order;
  }

  getOrders(): Promise<Order[]> {
    return this.ordersRepo.getOrders();
  }
  getOrdersByUserId(userId: number): Promise<Order[]> {
    return this.ordersRepo.getOrdersByUserId(userId);
  }
  deleteOrder(orderId: number, userId: number): Promise<boolean> {
    return this.ordersRepo.deleteOrder(orderId, userId);
  }
}
