import { Module } from '@nestjs/common';
import { CreateRegisterService } from './services/create-register.service';
import { UpdateRegisterService } from './services/update-register.service';
import { DeleteRegisterService } from './services/delete-register.service';
import { RegisterController } from './infra/http/register.controller';
import { TotalFarms } from './services/endpoints/total-farms.service';
import { FullAreaHectaresService } from './services/endpoints/full-area-hectares.service';

@Module({
  controllers: [RegisterController],
  providers: [
    CreateRegisterService,
    UpdateRegisterService,
    DeleteRegisterService,
    TotalFarms,
    FullAreaHectaresService,
  ],
})
export class FarmModule {}
