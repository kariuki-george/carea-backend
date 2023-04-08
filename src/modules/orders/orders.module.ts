import { Module } from '@nestjs/common';

import { OrdersResolver } from './orders.resolver';
import { OrdersService } from './orders.service';
import { OrdersRepo } from './orders.repo';
import { InventoryModule } from '../inventory/inventory.module';

@Module({
  providers: [OrdersService, OrdersResolver, OrdersRepo],
  imports: [InventoryModule],
})
export class OrdersModule {}
