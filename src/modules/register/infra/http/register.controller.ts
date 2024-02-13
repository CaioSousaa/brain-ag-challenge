import { CreateRegisterService } from '../../services/create-register.service';
import { CreateRegisterDTO } from '../../dto/create-register-dto';
import { UpdateRegisterService } from '../../services/update-register.service';
import { UpdateRegisterDTO } from '../../dto/update-register-dto';
import { DeleteRegisterService } from '../../services/delete-register.service';
import { TotalFarms } from '../../services/endpoints/total-farms.service';
import { FullAreaHectaresService } from '../../services/endpoints/full-area-hectares.service';
import { StatesCountService } from '../../services/endpoints/states-count.service';
import { CropsPlantedService } from '../../services/endpoints/crops-planted.service';
import { LandUseFarmService } from '../../services/endpoints/land-use-farm.service';
import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  UseInterceptors,
  ClassSerializerInterceptor,
  Param,
  Patch,
  Delete,
  Get,
} from '@nestjs/common';

@Controller('register')
export class RegisterController {
  constructor(
    private readonly registerService: CreateRegisterService,
    private readonly updateService: UpdateRegisterService,
    private readonly deleteService: DeleteRegisterService,
    private readonly totalFarms: TotalFarms,
    private readonly fullAreaHectaresService: FullAreaHectaresService,
    private readonly statesCountService: StatesCountService,
    private readonly cropsPlantedService: CropsPlantedService,
    private readonly landUseFarmService: LandUseFarmService,
  ) {}

  @Post()
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  create(@Body() registerDto: CreateRegisterDTO) {
    return this.registerService.execute(registerDto);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  update(@Param('id') id: string, @Body() updateDto: UpdateRegisterDTO) {
    return this.updateService.execute(id, updateDto);
  }

  @Delete(':id')
  async deleteRegister(@Param('id') id: string) {
    return this.deleteService.execute(id);
  }

  @Get('total')
  allFarms() {
    return this.totalFarms.execute();
  }

  @Get('full-area')
  fullArea() {
    return this.fullAreaHectaresService.execute();
  }

  @Get('count-states')
  allStates() {
    return this.statesCountService.execute();
  }

  @Get('crops')
  allCrops() {
    return this.cropsPlantedService.execute();
  }

  @Get('land-use')
  usage() {
    return this.landUseFarmService.execute();
  }
}
