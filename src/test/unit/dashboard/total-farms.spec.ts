import { TotalFarms } from 'src/modules/dashboard/endpoints/total-farms.service';

describe('TotalFarms', () => {
  let totalFarmsService: TotalFarms;

  beforeEach(() => {
    totalFarmsService = new TotalFarms();
  });

  it('should return total farms count', async () => {
    const mockFarmsCount = 10;

    const mockCountFunction = jest.fn().mockResolvedValueOnce(mockFarmsCount);
    const mockPrismaClient = {
      farm: {
        count: mockCountFunction,
      },
    };

    jest.mock('src/prisma', () => ({
      prismaClient: mockPrismaClient,
    }));

    const result = await totalFarmsService.execute();

    expect(result).toEqual(mockFarmsCount);

    expect(mockCountFunction).toHaveBeenCalledTimes(1);
  });
});
