import { Module } from '@nestjs/common';
import { CareaResolver } from './carea.resolver';
import { CareaService } from './carea.service';

@Module({
  imports: [],
  providers: [CareaService, CareaResolver],
})
export class CareaModule {}
