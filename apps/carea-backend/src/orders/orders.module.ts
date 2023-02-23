import { Module } from '@nestjs/common';
import { RmqModule } from 'libs/rmq/rmq.module';

import { OrdersResolver } from './orders.resolver';
import { OrdersService } from './orders.service';

@Module({
  imports: [RmqModule],

  providers: [OrdersService, OrdersResolver],
})
export class OrdersModule {}
