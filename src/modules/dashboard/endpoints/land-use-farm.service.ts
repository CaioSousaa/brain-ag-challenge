import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { checkingPercentage } from 'src/utils/functions/farm-area-use';
import prismaClient from 'src/prisma';
import { LandUseData } from 'src/utils/interfaces/land-use-date';

@Injectable()
export class LandUseFarmService {
  async execute(): Promise<LandUseData> {
    try {
      const data: LandUseData = {
        usePlantable: '0.00',
        useVegetation: '0.00',
      };

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
