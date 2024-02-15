import { FullAreaHectaresService } from 'src/modules/dashboard/services/full-area-hectares.service';

describe('FullAreaHectaresService', () => {
  let service: FullAreaHectaresService;

  beforeEach(() => {
    service = new FullAreaHectaresService();
  });

  it('should return the total hectares correctly', async () => {
    const expectedTotalHectares = 30;

    const result = await service.execute();

    expect(result).toEqual(expectedTotalHectares);
  });
});
