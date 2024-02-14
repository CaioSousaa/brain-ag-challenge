import { LandUseFarmService } from 'src/modules/dashboard/endpoints/land-use-farm.service';
import { InternalServerErrorException } from '@nestjs/common';

const mockPrismaClient = {
  farm: {
    aggregate: jest.fn(),
  },
};

jest.mock('src/prisma', () => ({
  prismaClient: mockPrismaClient,
}));

describe('LandUseFarmService', () => {
  let landUseFarmService: LandUseFarmService;

  beforeEach(() => {
    landUseFarmService = new LandUseFarmService();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should calculate land use percentages correctly', async () => {
    const mockFullArea = { _sum: { ttl_hectares: 1000 } };
    const mockPlantableArea = { _sum: { plantable_area: 600 } };
    const mockVegetationArea = { _sum: { vegetation_area: 200 } };

    mockPrismaClient.farm.aggregate
      .mockResolvedValueOnce(mockFullArea)
      .mockResolvedValueOnce(mockPlantableArea)
      .mockResolvedValueOnce(mockVegetationArea);

    const result = await landUseFarmService.execute();

    expect(mockPrismaClient.farm.aggregate).toHaveBeenCalledTimes(3);
    expect(result.usePlantable).toEqual('60.00');
    expect(result.useVegetation).toEqual('20.00');
  });

  it('should throw InternalServerErrorException if aggregation fails', async () => {
    mockPrismaClient.farm.aggregate.mockRejectedValueOnce(new Error());

    await expect(landUseFarmService.execute()).rejects.toThrowError(
      InternalServerErrorException,
    );
  });
});
