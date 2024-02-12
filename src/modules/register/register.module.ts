import { Module } from '@nestjs/common';
import { CreateRegisterService } from './services/create-register.service';
import { CreateRegisterController } from './infra/http/create-register.controller';

@Module({
  controllers: [CreateRegisterController],
  providers: [CreateRegisterService],
})
export class FarmModule {}
