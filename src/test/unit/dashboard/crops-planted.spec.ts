import { CropsPlantedService } from 'src/modules/dashboard/endpoints/crops-planted.service';
import { prismaMock, farmsWithCrops } from './mocks/mocks-dashboards';

describe('CropsPlantedService', () => {
  let service: CropsPlantedService;

  beforeEach(() => {
    service = new CropsPlantedService(prismaMock as any);
  });

  it('should return the count of crops planted correctly', async () => {
    const expectedCropCounts = [
      { crop: 'coffee', count: 3 },
      { crop: 'cotton', count: 3 },
    ];

    prismaMock.farm.findMany.mockResolvedValue(farmsWithCrops);

    const result = await service.execute();

    expect(result).toEqual(expectedCropCounts);
  });
});
