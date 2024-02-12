import { CreateRegisterService } from '../../services/create-register.service';
import { ICreateRegisterDTO } from '../../dto/create-register-dto';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('register')
export class CreateRegisterController {
  constructor(private readonly registerService: CreateRegisterService) {}

  @Post()
  create(@Body() registerDto: ICreateRegisterDTO) {
    return this.registerService.execute(registerDto);
  }
}
