import prismaClient from 'src/prisma';
import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
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
