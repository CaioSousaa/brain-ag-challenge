import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateRegisterDTO } from '../dto/create-register-dto';
import prismaClient from 'src/prisma';
import { checkingTerrain } from 'src/test/utils/functions/checking-terrain';
import { isValidCPFOrCNPJ } from 'src/test/utils/functions/validation-legalId';

@Injectable()
export class CreateRegisterService {
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
  }: CreateRegisterDTO) {
    try {
      const legalIdAlreadyExist = await prismaClient.farm.findUnique({
        where: {
          legalId,
        },
      });

      if (legalIdAlreadyExist) {
        throw new ConflictException('the CPF or CNPJ is already registered');
      }

      if (!checkingTerrain(ttl_hectares, plantable_area, vegetation_area)) {
        throw new Error(
          'the size of the sum of the plantable and vegetation areas' +
            'exceeded the total size of the farm. try again please',
        );
      }

      if (!isValidCPFOrCNPJ(legalId)) {
        throw new Error(
          'invalid CPF or CNPJ format. follow the standard XXX.XXX.XXX-XX for CPF and XX.XXX.XXX/XXXX-XX',
        );
      }

      const farm = await prismaClient.farm.create({
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
      if (error) throw error;
      throw new InternalServerErrorException(
        'Error intern in server, please try again',
      );
    }
  }
}
