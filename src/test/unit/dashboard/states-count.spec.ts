import { StatesCountService } from 'src/modules/dashboard/endpoints/states-count.service';
import { prismaMock } from './mocks/mocks-dashboards';

describe('StatesCountService', () => {
  let service: StatesCountService;

  beforeEach(() => {
    service = new StatesCountService(prismaMock as any);
  });

  it('should return the count of farms grouped by state correctly', async () => {
    const mockCountStates = [
      { state: 'Rio de Janeiro', _count: 2 },
      { state: 'Ceara', _count: 1 },
    ];

    const expectedCountStates = mockCountStates.map((item) => ({
      state: item.state,
      count: item._count,
    }));

    prismaMock.farm.groupBy.mockResolvedValue(mockCountStates);

    const result = await service.execute();

    expect(result).toEqual(expectedCountStates);
  });
});
