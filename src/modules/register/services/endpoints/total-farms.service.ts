import prismaClient from 'src/prisma';
import { InternalServerErrorException } from '@nestjs/common';

export class TotalFarms {
  async execute() {
    try {
      const cont = await prismaClient.farm.count({});

      return cont;
    } catch (error) {
      if (error) throw error;
      throw new InternalServerErrorException(
        'Error intern in server, please try again',
      );
    }
  }
}
