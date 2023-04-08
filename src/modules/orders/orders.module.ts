import { Module } from '@nestjs/common';

import { OrdersResolver } from './orders.resolver';
import { OrdersService } from './orders.service';

@Module({
  providers: [OrdersService, OrdersResolver],
})
export class OrdersModule {}
