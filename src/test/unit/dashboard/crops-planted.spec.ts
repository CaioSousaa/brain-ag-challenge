import { CropsPlantedService } from 'src/modules/dashboard/endpoints/crops-planted.service';

const mockPrismaClient = {
  farm: {
    findMany: jest.fn(),
  },
};

jest.mock('src/prisma', () => ({
  prismaClient: mockPrismaClient,
}));

describe('CropsPlantedService', () => {
  let cropsPlantedService: CropsPlantedService;

  beforeEach(() => {
    cropsPlantedService = new CropsPlantedService();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return counts of planted crops', async () => {
    const mockFarms = [
      {
        id: 1,
        planted_crops: ['Corn', 'Corn', 'Wheat', 'Soybean', 'Wheat'],
      },
      {
        id: 2,
        planted_crops: ['Wheat', 'Soybean', 'Soybean', 'Corn'],
      },
    ];

    mockPrismaClient.farm.findMany.mockResolvedValueOnce(mockFarms);

    const expectedResults = [
      { crop: 'Corn', count: 3 },
      { crop: 'Wheat', count: 4 },
      { crop: 'Soybean', count: 3 },
    ];

    const result = await cropsPlantedService.execute();

    expect(result).toEqual(expectedResults);
    expect(mockPrismaClient.farm.findMany).toHaveBeenCalledTimes(1);
  });
});
