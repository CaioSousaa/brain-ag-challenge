import { Module } from '@nestjs/common';
import { CreateRegisterService } from './services/create-register.service';
import { UpdateRegisterService } from './services/update-register.service';
import { DeleteRegisterService } from './services/delete-register.service';
import { RegisterController } from './infra/http/register.controller';
import { TotalFarms } from '../dashboard/endpoints/total-farms.service';
import { FullAreaHectaresService } from '../dashboard/endpoints/full-area-hectares.service';
import { StatesCountService } from '../dashboard/endpoints/states-count.service';
import { CropsPlantedService } from '../dashboard/endpoints/crops-planted.service';
import { LandUseFarmService } from '../dashboard/endpoints/land-use-farm.service';

@Module({
  controllers: [RegisterController],
  providers: [
    CreateRegisterService,
    UpdateRegisterService,
    DeleteRegisterService,
    TotalFarms,
    FullAreaHectaresService,
    StatesCountService,
    CropsPlantedService,
    LandUseFarmService,
  ],
})
export class FarmModule {}
