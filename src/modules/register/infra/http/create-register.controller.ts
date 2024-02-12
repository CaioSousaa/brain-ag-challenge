import { CreateRegisterService } from '../../services/create-register.service';
import { CreateRegisterDTO } from '../../dto/create-register-dto';
import { UpdateRegisterService } from '../../services/update-register.service';
import { UpdateRegisterDTO } from '../../dto/update-register-dto';
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
} from '@nestjs/common';

@Controller('register')
export class registerController {
  constructor(
    private readonly registerService: CreateRegisterService,
    private readonly updateService: UpdateRegisterService,
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
}
