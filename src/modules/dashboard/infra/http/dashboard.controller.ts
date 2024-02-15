import { TotalFarms } from '../../../dashboard/services/total-farms.service';
import { FullAreaHectaresService } from '../../../dashboard/services/full-area-hectares.service';
import { StatesCountService } from '../../../dashboard/services/states-count.service';
import { CropsPlantedService } from '../../../dashboard/services/crops-planted.service';
import { LandUseFarmService } from '../../../dashboard/services/land-use-farm.service';
import { Get, Controller } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('dashboard')
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
  @ApiBearerAuth()
  public async allFarms() {
    return this.totalFarms.execute();
  }

  @Get('full-area')
  @ApiBearerAuth()
  public async fullArea() {
    return this.fullAreaHectaresService.execute();
  }

  @Get('count-states')
  @ApiBearerAuth()
  public async allStates() {
    return this.statesCountService.execute();
  }

  @Get('crops')
  @ApiBearerAuth()
  public async allCrops() {
    return this.cropsPlantedService.execute();
  }

  @Get('land-use')
  @ApiBearerAuth()
  public async usage() {
    return this.landUseFarmService.execute();
  }
}
