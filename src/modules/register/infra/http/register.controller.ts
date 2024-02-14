import { CreateRegisterService } from '../../services/create-register.service';
import { CreateRegisterDTO } from '../../dto/create-register-dto';
import { UpdateRegisterService } from '../../services/update-register.service';
import { UpdateRegisterDTO } from '../../dto/update-register-dto';
import { DeleteRegisterService } from '../../services/delete-register.service';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';

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
} from '@nestjs/common';
import { Farm } from '@prisma/client';
@ApiTags('register')
@Controller('register')
export class RegisterController {
  constructor(
    private readonly registerService: CreateRegisterService,
    private readonly updateService: UpdateRegisterService,
    private readonly deleteService: DeleteRegisterService,
  ) {}

  @Post()
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBody({ type: CreateRegisterDTO })
  @ApiBearerAuth()
  public async create(@Body() registerDto: CreateRegisterDTO): Promise<Farm> {
    return this.registerService.execute(registerDto);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  @ApiBody({ type: UpdateRegisterService })
  @ApiBearerAuth()
  public async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateRegisterDTO,
  ): Promise<Farm> {
    return this.updateService.execute(id, updateDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  public async deleteRegister(@Param('id') id: string) {
    return this.deleteService.execute(id);
  }
}
