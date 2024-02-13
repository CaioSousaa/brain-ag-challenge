import prismaClient from 'src/prisma';
import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class FullAreaHectaresService {
  async execute() {
    try {
      const fullArea = await prismaClient.farm.aggregate({
        _sum: {
          ttl_hectares: true,
        },
      });

      return fullArea._sum.ttl_hectares;
    } catch (error) {
      if (error) throw error;
      throw new InternalServerErrorException(
        'Error intern in server, please try again',
      );
    }
  }
}
