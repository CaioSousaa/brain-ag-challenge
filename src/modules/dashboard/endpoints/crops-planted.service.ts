import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CropsPlantedService {
  constructor(private readonly prisma: PrismaService) {}
  async execute() {
    try {
      const farms = await this.prisma.farm.findMany();

      const cropCounts: Record<string, number> = {};

      farms.forEach((farm) => {
        const crops = farm.planted_crops;

        if (Array.isArray(crops)) {
          crops.forEach((crop) => {
            if (crop in cropCounts) {
              cropCounts[crop]++;
            } else {
              cropCounts[crop] = 1;
            }
          });
        }
      });

      const result = Object.keys(cropCounts).map((crop) => ({
        crop,
        count: cropCounts[crop],
      }));

      return result;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro interno do servidor, por favor, tente novamente',
      );
    }
  }
}
