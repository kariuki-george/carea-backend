import { Module } from '@nestjs/common';
import { InventoryResolver } from './inventory.resolver';
import { InventoryService } from './inventory.service';

@Module({
  providers: [InventoryService, InventoryResolver],
})
export class InventoryModule {}
