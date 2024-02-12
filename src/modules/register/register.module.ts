import { Module } from '@nestjs/common';
import { CreateRegisterService } from './services/create-register.service';
import { UpdateRegisterService } from './services/update-register.service';
import { DeleteRegisterService } from './services/delete-register.service';
import { registerController } from './infra/http/register.controller';

@Module({
  controllers: [registerController],
  providers: [
    CreateRegisterService,
    UpdateRegisterService,
    DeleteRegisterService,
  ],
})
export class FarmModule {}
