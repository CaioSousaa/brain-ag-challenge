import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { checkingPercentage } from 'src/test/utils/functions/farm-area-use';
import prismaClient from 'src/prisma';

@Injectable()
export class LandUseFarmService {
  async execute() {
    try {
      const data = {};

      const fullArea = await prismaClient.farm.aggregate({
        _sum: {
          ttl_hectares: true,
        },
      });

      const plantableArea = await prismaClient.farm.aggregate({
        _sum: {
          plantable_area: true,
        },
      });

      const vegetationArea = await prismaClient.farm.aggregate({
        _sum: {
          vegetation_area: true,
        },
      });

      const usePlantable = checkingPercentage(
        plantableArea._sum.plantable_area,
        fullArea._sum.ttl_hectares,
      );

      data['usePlantable'] = `${usePlantable.toFixed(2)}`;

      const useVegetation = checkingPercentage(
        vegetationArea._sum.vegetation_area,
        fullArea._sum.ttl_hectares,
      );

      data['useVegetation'] = `${useVegetation.toFixed(2)}`;

      return data;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro interno no servidor. Por favor, tente novamente.',
      );
    }
  }
}
