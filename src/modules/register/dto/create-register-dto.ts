import { Crops } from '@prisma/client';
import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class CreateRegisterDTO {
  @IsString({ message: 'This legalId variable need to be string' })
  @IsNotEmpty({ message: 'This legalId variable can not empty' })
  legalId: string;

  @IsString({ message: 'This name variable need to be string' })
  @IsNotEmpty({ message: 'This name variable can not empty' })
  name: string;

  @IsString({ message: 'This farme_name variable need to be string' })
  @IsNotEmpty({ message: 'This farme_name variable can not empty' })
  farm_name: string;

  @IsString({ message: 'This city variable need to be string' })
  @IsNotEmpty({ message: 'This city variable can not empty' })
  city: string;

  @IsString({ message: 'This state variable need to be string' })
  @IsNotEmpty({ message: 'This state variable can not empty' })
  state: string;

  @IsInt({ message: 'This total hectares variable need to be number' })
  @IsNotEmpty({ message: 'This total hectares variable can not empty' })
  ttl_hectares: number;

  @IsInt({ message: 'This plantable area variable need to be number' })
  @IsNotEmpty({ message: 'This plantable area variable can not empty' })
  plantable_area: number;

  @IsInt({ message: 'This vegetation area variable need to be number' })
  @IsNotEmpty({ message: 'This vegetation area variable can not empty' })
  vegetation_area: number;
  planted_crops: Crops[];
}
