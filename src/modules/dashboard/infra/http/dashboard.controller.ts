import { TotalFarms } from '../../../dashboard/services/total-farms.service';
import { FullAreaHectaresService } from '../../../dashboard/services/full-area-hectares.service';
import { StatesCountService } from '../../../dashboard/services/states-count.service';
import { CropsPlantedService } from '../../../dashboard/services/crops-planted.service';
import { LandUseFarmService } from '../../../dashboard/services/land-use-farm.service';
import { Get, Controller } from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOkResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';

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

  @ApiOkResponse({ status: 200, description: 'data returned' })
  @ApiBadRequestResponse({
    status: 400,
    description: 'unable to return data',
  })
  @Get('total')
  @ApiBearerAuth()
  public async allFarms() {
    return this.totalFarms.execute();
  }

  @ApiOkResponse({ status: 200, description: 'data returned' })
  @ApiBadRequestResponse({
    status: 400,
    description: 'unable to return data',
  })
  @Get('full-area')
  @ApiBearerAuth()
  public async fullArea() {
    return this.fullAreaHectaresService.execute();
  }

  @ApiOkResponse({ status: 200, description: 'data returned' })
  @ApiBadRequestResponse({
    status: 400,
    description: 'unable to return data',
  })
  @Get('count-states')
  @ApiBearerAuth()
  public async allStates() {
    return this.statesCountService.execute();
  }

  @ApiOkResponse({ status: 200, description: 'data returned' })
  @ApiBadRequestResponse({
    status: 400,
    description: 'unable to return data',
  })
  @Get('crops')
  @ApiBearerAuth()
  public async allCrops() {
    return this.cropsPlantedService.execute();
  }

  @ApiOkResponse({ status: 200, description: 'data returned' })
  @ApiBadRequestResponse({
    status: 400,
    description: 'unable to return data',
  })
  @Get('land-use')
  @ApiBearerAuth()
  public async usage() {
    return this.landUseFarmService.execute();
  }
}
