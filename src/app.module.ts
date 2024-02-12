import { Module } from '@nestjs/common';
import { FarmModule } from './modules/register/register.module';

@Module({
  imports: [FarmModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
