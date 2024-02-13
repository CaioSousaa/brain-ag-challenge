import { Crops } from '@prisma/client';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateRegisterDTO {
  @IsString({ message: 'this legalId must be a string' })
  @IsNotEmpty({ message: 'the legalId field cannot be empty ' })
  @IsOptional()
  @ApiPropertyOptional()
  legalId?: string;

  @IsString({ message: 'this name must be a string' })
  @IsNotEmpty({ message: 'the name field cannot be empty ' })
  @IsOptional()
  @ApiPropertyOptional()
  name?: string;

  @IsString({ message: 'this farm name must be a string' })
  @IsNotEmpty({ message: 'the farm name field cannot be empty ' })
  @IsOptional()
  @ApiPropertyOptional()
  farm_name?: string;

  @IsInt({ message: 'this total hectares must be a int' })
  @IsNotEmpty({ message: 'the total hectares field cannot be empty ' })
  @IsOptional()
  @ApiPropertyOptional()
  ttl_hectares?: number;

  @IsInt({ message: 'this plantable area must be a int' })
  @IsNotEmpty({ message: 'the plantable area field cannot be empty ' })
  @IsOptional()
  @ApiPropertyOptional()
  plantable_area?: number;

  @IsInt({ message: 'this vegetation area must be a int' })
  @IsNotEmpty({ message: 'the vegetation area field cannot be empty ' })
  @IsOptional()
  @ApiPropertyOptional()
  vegetation_area?: number;

  @IsNotEmpty({ message: 'the planted crops area field cannot be empty ' })
  @IsOptional()
  @ApiPropertyOptional()
  planted_crops?: Crops[];
}
