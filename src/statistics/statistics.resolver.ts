import { Query, Resolver } from '@nestjs/graphql';
import { StatisticsRes } from './res/statistics.res';
import { StatisticsService } from './statistics.service';

@Resolver()
export class StatisticsResolver {
  constructor(private readonly statisticsService: StatisticsService) {}
  @Query(() => StatisticsRes)
  statistics(): Promise<StatisticsRes> {
    return this.statisticsService.statistics();
  }
}
