import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import prismaClient from 'src/prisma';

@Injectable()
export class DeleteRegisterService {
  async execute(id: string) {
    try {
      const farmExist = await prismaClient.farm.findUnique({
        where: {
          id: parseInt(id),
        },
      });

      if (!farmExist) {
        throw new NotFoundException(
          'there is no record of this farm in the database',
        );
      }

      await prismaClient.farm.delete({
        where: {
          id: farmExist.id,
        },
      });

      return;
    } catch (error) {
      if (error) throw error;
      throw new InternalServerErrorException(
        'Error intern in server, please try again',
      );
    }
  }
}
