import { FullAreaHectaresService } from 'src/modules/dashboard/endpoints/full-area-hectares.service';

const mockPrismaClient = {
  farm: {
    aggregate: jest.fn(),
  },
};

jest.mock('src/prisma', () => ({
  prismaClient: mockPrismaClient,
}));

describe('FullAreaHectaresService', () => {
  let fullAreaHectaresService: FullAreaHectaresService;

  beforeEach(() => {
    fullAreaHectaresService = new FullAreaHectaresService();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return total area in hectares', async () => {
    const mockTotalArea = {
      _sum: {
        ttl_hectares: 500,
      },
    };

    mockPrismaClient.farm.aggregate.mockResolvedValueOnce(mockTotalArea);

    const expectedResult = 500;

    const result = await fullAreaHectaresService.execute();

    expect(result).toEqual(expectedResult);
    expect(mockPrismaClient.farm.aggregate).toHaveBeenCalledTimes(1);
  });
});
