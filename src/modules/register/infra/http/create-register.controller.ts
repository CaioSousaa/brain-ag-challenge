import { CreateRegisterService } from '../../services/create-register.service';
import { CreateRegisterDTO } from '../../dto/create-register-dto';
import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

@Controller('register')
export class CreateRegisterController {
  constructor(private readonly registerService: CreateRegisterService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() registerDto: CreateRegisterDTO) {
    return this.registerService.execute(registerDto);
  }
}
