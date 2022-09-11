import { Injectable } from '@nestjs/common';

import { PrismaService } from 'libs/database/prisma.service';
import { StatisticsRes } from './res/statistics.res';

@Injectable()
export class StatisticsService {
  constructor(private readonly prismaService: PrismaService) {}
  async statistics(): Promise<StatisticsRes> {
    const users = await this.prismaService.user.count();
    const cars = await this.prismaService.car.count();
    const orders = await this.prismaService.order.count();
    return {
      users,
      cars,
      orders,
    };
  }
}
