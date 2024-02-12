import { Module } from '@nestjs/common';
import { CreateRegisterService } from './services/create-register.service';
import { UpdateRegisterService } from './services/update-register.service';
import { registerController } from './infra/http/create-register.controller';

@Module({
  controllers: [registerController],
  providers: [CreateRegisterService, UpdateRegisterService],
})
export class FarmModule {}
