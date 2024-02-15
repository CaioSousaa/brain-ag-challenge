import { CreateRegisterService } from '../../services/create-register.service';
import { CreateRegisterDTO } from '../../dto/create-register-dto';
import { UpdateRegisterService } from '../../services/update-register.service';
import { UpdateRegisterDTO } from '../../dto/update-register-dto';
import { DeleteRegisterService } from '../../services/delete-register.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiTags,
  ApiOkResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';

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

  @ApiOkResponse({ status: 201, description: 'The register has been created' })
  @ApiBadRequestResponse({
    status: 400,
    description: 'The register has not created',
  })
  @Post()
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBody({ type: CreateRegisterDTO })
  @ApiBearerAuth()
  public async create(@Body() registerDto: CreateRegisterDTO): Promise<Farm> {
    return this.registerService.execute(registerDto);
  }

  @ApiOkResponse({ status: 200, description: 'record changed successfully' })
  @ApiBadRequestResponse({
    status: 400,
    description: 'unable to change registry',
  })
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

  @ApiOkResponse({ status: 200, description: 'record deleted successfully' })
  @ApiBadRequestResponse({
    status: 400,
    description: 'unable to delete registry',
  })
  @Delete(':id')
  @ApiBearerAuth()
  public async deleteRegister(@Param('id') id: string) {
    return this.deleteService.execute(id);
  }
}
