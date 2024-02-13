import { Module } from '@nestjs/common';
import { DashboardController } from './infra/http/dashboard.controller';
import { TotalFarms } from '../dashboard/endpoints/total-farms.service';
import { FullAreaHectaresService } from '../dashboard/endpoints/full-area-hectares.service';
import { StatesCountService } from '../dashboard/endpoints/states-count.service';
import { CropsPlantedService } from '../dashboard/endpoints/crops-planted.service';
import { LandUseFarmService } from '../dashboard/endpoints/land-use-farm.service';

@Module({
  controllers: [DashboardController],
  providers: [
    TotalFarms,
    FullAreaHectaresService,
    StatesCountService,
    CropsPlantedService,
    LandUseFarmService,
  ],
})
export class dashboardModules {}
