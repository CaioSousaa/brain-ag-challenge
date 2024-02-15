import { LandUseFarmService } from 'src/modules/dashboard/services/land-use-farm.service';

describe('LandUseFarmService', () => {
  let service: LandUseFarmService;

  beforeEach(() => {
    service = new LandUseFarmService();
  });

  it('should calculate land use percentages correctly', async () => {
    const expectedData = {
      usePlantable: '50.00',
      useVegetation: '50.00',
    };

    const result = await service.execute();

    expect(result).toEqual(expectedData);
  });
});
