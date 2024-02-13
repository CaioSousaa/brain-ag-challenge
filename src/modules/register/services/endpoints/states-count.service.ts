import { Injectable, InternalServerErrorException } from '@nestjs/common';
import prismaClient from 'src/prisma';

@Injectable()
export class StatesCountService {
  async execute() {
    try {
      const countStates = await prismaClient.farm.groupBy({
        by: ['state'],
        _count: {
          state: true,
        },
      });

      return countStates.map((item) => ({
        state: item.state,
        count: item._count.state,
      }));
    } catch (error) {
      if (error) throw error;
      throw new InternalServerErrorException(
        'Error intern in server, please try again',
      );
    }
  }
}
