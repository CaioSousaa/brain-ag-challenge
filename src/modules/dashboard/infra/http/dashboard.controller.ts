import { TotalFarms } from '../../../dashboard/endpoints/total-farms.service';
import { FullAreaHectaresService } from '../../../dashboard/endpoints/full-area-hectares.service';
import { StatesCountService } from '../../../dashboard/endpoints/states-count.service';
import { CropsPlantedService } from '../../../dashboard/endpoints/crops-planted.service';
import { LandUseFarmService } from '../../../dashboard/endpoints/land-use-farm.service';
import { Get, Controller } from '@nestjs/common';

@Controller('dashboard')
export class DashboardController {
  constructor(
    private readonly totalFarms: TotalFarms,
    private readonly fullAreaHectaresService: FullAreaHectaresService,
    private readonly statesCountService: StatesCountService,
    private readonly cropsPlantedService: CropsPlantedService,
    private readonly landUseFarmService: LandUseFarmService,
  ) {}

  @Get('total')
  public async allFarms() {
    return this.totalFarms.execute();
  }

  @Get('full-area')
  public async fullArea() {
    return this.fullAreaHectaresService.execute();
  }

  @Get('count-states')
  public async allStates() {
    return this.statesCountService.execute();
  }

  @Get('crops')
  public async allCrops() {
    return this.cropsPlantedService.execute();
  }

  @Get('land-use')
  public async usage() {
    return this.landUseFarmService.execute();
  }
}
