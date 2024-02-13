import { Crops } from '@prisma/client';
import { IsString, IsNotEmpty, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRegisterDTO {
  @IsString({ message: 'This legalId variable need to be string' })
  @IsNotEmpty({ message: 'This legalId variable can not empty' })
  @ApiProperty()
  legalId: string;

  @IsString({ message: 'This name variable need to be string' })
  @IsNotEmpty({ message: 'This name variable can not empty' })
  @ApiProperty()
  name: string;

  @IsString({ message: 'This farme_name variable need to be string' })
  @IsNotEmpty({ message: 'This farme_name variable can not empty' })
  @ApiProperty()
  farm_name: string;

  @IsString({ message: 'This city variable need to be string' })
  @IsNotEmpty({ message: 'This city variable can not empty' })
  @ApiProperty()
  city: string;

  @IsString({ message: 'This state variable need to be string' })
  @IsNotEmpty({ message: 'This state variable can not empty' })
  @ApiProperty()
  state: string;

  @IsInt({ message: 'This total hectares variable need to be number' })
  @IsNotEmpty({ message: 'This total hectares variable can not empty' })
  @ApiProperty()
  ttl_hectares: number;

  @IsInt({ message: 'This plantable area variable need to be number' })
  @IsNotEmpty({ message: 'This plantable area variable can not empty' })
  @ApiProperty()
  plantable_area: number;

  @IsInt({ message: 'This vegetation area variable need to be number' })
  @IsNotEmpty({ message: 'This vegetation area variable can not empty' })
  @ApiProperty()
  vegetation_area: number;

  @IsNotEmpty({ message: 'This planted crops area variable can not empty' })
  @ApiProperty()
  planted_crops: Crops[];
}
