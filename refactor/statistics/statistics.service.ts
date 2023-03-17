import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/providers/database/prisma.service';
import { StatisticsRes } from './res/statistics.res';

@Injectable()
export class StatisticsService {
  constructor(private readonly prismaService: PrismaService) {}
  async statistics(): Promise<StatisticsRes> {
    const users = await this.prismaService.users.count();
    const cars = await this.prismaService.cars.count();
    const orders = await this.prismaService.orders.count();
    return {
      users,
      cars,
      orders,
    };
  }
}
