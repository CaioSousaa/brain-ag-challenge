import { StatesCountService } from 'src/modules/dashboard/endpoints/states-count.service';

const mockPrismaClient = {
  farm: {
    groupBy: jest.fn(),
  },
};

jest.mock('src/prisma', () => ({
  prismaClient: mockPrismaClient,
}));

describe('StatesCountService', () => {
  let statesCountService: StatesCountService;

  beforeEach(() => {
    statesCountService = new StatesCountService();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return count of farms by state', async () => {
    const mockStatesCount = [
      { state: 'State1', _count: { state: 10 } },
      { state: 'State2', _count: { state: 20 } },
    ];
    mockPrismaClient.farm.groupBy.mockResolvedValueOnce(mockStatesCount);

    const expectedResults = [
      { state: 'State1', count: 10 },
      { state: 'State2', count: 20 },
    ];

    const result = await statesCountService.execute();

    expect(result).toEqual(expectedResults);
    expect(mockPrismaClient.farm.groupBy).toHaveBeenCalledTimes(1);
  });
});
