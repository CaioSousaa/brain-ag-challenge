import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StatesCountService {
  constructor(private readonly prisma: PrismaService) {}

  async execute() {
    try {
      const countStates = await this.prisma.farm.groupBy({
        by: ['state'],
        _count: true,
      });

      return countStates.map((item) => ({
        state: item.state,
        count: item._count,
      }));
    } catch (error) {
      throw new InternalServerErrorException(
        'Internal server error, please try again',
      );
    }
  }
}
