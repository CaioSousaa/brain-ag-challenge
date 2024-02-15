import { Module } from '@nestjs/common';
import { CreateRegisterService } from './services/create-register.service';
import { UpdateRegisterService } from './services/update-register.service';
import { DeleteRegisterService } from './services/delete-register.service';
import { RegisterController } from './infra/http/register.controller';
import { DashboardController } from '../dashboard/infra/http/dashboard.controller';
import { TotalFarms } from '../dashboard/services/total-farms.service';
import { FullAreaHectaresService } from '../dashboard/services/full-area-hectares.service';
import { StatesCountService } from '../dashboard/services/states-count.service';
import { CropsPlantedService } from '../dashboard/services/crops-planted.service';
import { LandUseFarmService } from '../dashboard/services/land-use-farm.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [RegisterController, DashboardController],
  providers: [
    CreateRegisterService,
    UpdateRegisterService,
    DeleteRegisterService,
    TotalFarms,
    FullAreaHectaresService,
    StatesCountService,
    CropsPlantedService,
    LandUseFarmService,
    PrismaService,
  ],
})
export class FarmModule {}
