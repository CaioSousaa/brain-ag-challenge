import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotAcceptableException,
} from '@nestjs/common';
import { CreateRegisterDTO } from '../dto/create-register-dto';
import { checkingTerrain } from 'src/utils/functions/checking-terrain';
import { isValidCPFOrCNPJ } from 'src/utils/functions/validation-legalId';
import { Farm } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CreateRegisterService {
  constructor(private readonly prisma: PrismaService) {}

  async execute({
    legalId,
    name,
    farm_name,
    city,
    state,
    ttl_hectares,
    plantable_area,
    vegetation_area,
    planted_crops,
  }: CreateRegisterDTO): Promise<Farm> {
    try {
      const legalIdAlreadyExist = await this.prisma.farm.findUnique({
        where: {
          legalId,
        },
      });

      if (legalIdAlreadyExist) {
        throw new ConflictException('The CPF or CNPJ is already registered');
      }

      if (!isValidCPFOrCNPJ(legalId)) {
        throw new NotAcceptableException(
          'Invalid CPF or CNPJ format. Follow the standard XXX.XXX.XXX-XX for CPF and XX.XXX.XXX/XXXX-XX',
        );
      }

      if (!checkingTerrain(ttl_hectares, plantable_area, vegetation_area)) {
        throw new NotAcceptableException(
          'The size of the sum of the plantable and vegetation areas exceeded the total size of the farm. Try again please',
        );
      }

      const farm = await this.prisma.farm.create({
        data: {
          legalId,
          name,
          farm_name,
          city,
          state,
          ttl_hectares,
          plantable_area,
          vegetation_area,
          planted_crops,
        },
      });

      return farm;
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      } else if (error instanceof NotAcceptableException) {
        throw error;
      } else if (error instanceof InternalServerErrorException) {
        throw error;
      } else {
        throw new InternalServerErrorException(
          'Internal server error occurred. Please try again.',
        );
      }
    }
  }
}
