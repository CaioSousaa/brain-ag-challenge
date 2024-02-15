import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DeleteRegisterService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(id: string) {
    try {
      const farmExist = await this.prisma.farm.findUnique({
        where: {
          id: parseInt(id),
        },
      });

      if (!farmExist) {
        throw new NotFoundException(
          'there is no record of this farm in the database',
        );
      }

      await this.prisma.farm.delete({
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
