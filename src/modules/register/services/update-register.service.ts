import prismaClient from 'src/prisma';
import { UpdateRegisterDTO } from '../dto/update-register-dto';
import { isValidCPFOrCNPJ } from 'src/test/utils/functions/validation-legalId';
import { checkingTerrain } from 'src/test/utils/functions/checking-terrain';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class UpdateRegisterService {
  async execute(
    id: string,
    {
      legalId,
      name,
      farm_name,
      ttl_hectares,
      vegetation_area,
      plantable_area,
      planted_crops,
    }: UpdateRegisterDTO,
  ) {
    try {
      const farm = await prismaClient.farm.findUnique({
        where: {
          id: parseInt(id),
        },
      });

      if (!farm) {
        throw new NotFoundException(
          'This record does not exist in the database!!!',
        );
      }

      if (legalId && farm.legalId !== legalId) {
        if (!isValidCPFOrCNPJ(legalId)) {
          throw new Error(
            'invalid CPF or CNPJ format. follow the standard XXX.XXX.XXX-XX for CPF and XX.XXX.XXX/XXXX-XX',
          );
        }

        const registerUseByLegalId = await prismaClient.farm.findFirst({
          where: {
            legalId: legalId,
          },
        });

        if (registerUseByLegalId) {
          throw new UnauthorizedException(
            'This legalId is in usage for other register',
          );
        }
      }

      if (!checkingTerrain(ttl_hectares, plantable_area, vegetation_area)) {
        throw new Error(
          'the size of the sum of the plantable and vegetation areas' +
            'exceeded the total size of the farm. try again please',
        );
      }

      const updateRegister = await prismaClient.farm.update({
        where: {
          id: farm.id,
        },

        data: {
          legalId,
          name,
          farm_name,
          ttl_hectares,
          vegetation_area,
          plantable_area,
          planted_crops,
        },
      });

      return updateRegister;
    } catch (error) {
      if (error) throw error;
      throw new InternalServerErrorException(
        'Error intern in server, please try again',
      );
    }
  }
}