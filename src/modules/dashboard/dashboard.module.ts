import { Module } from '@nestjs/common';
import { DashboardController } from './infra/http/dashboard.controller';
import { TotalFarms } from '../dashboard/services/total-farms.service';
import { FullAreaHectaresService } from '../dashboard/services/full-area-hectares.service';
import { StatesCountService } from '../dashboard/services/states-count.service';
import { CropsPlantedService } from '../dashboard/services/crops-planted.service';
import { LandUseFarmService } from '../dashboard/services/land-use-farm.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [DashboardController],
  providers: [
    TotalFarms,
    FullAreaHectaresService,
    StatesCountService,
    CropsPlantedService,
    LandUseFarmService,
    PrismaService,
  ],
})
export class dashboardModules {}
