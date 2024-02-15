import { TotalFarms } from '../../../modules/dashboard/endpoints/total-farms.service';
import prismaClient from 'src/prisma';

describe('TotalFarms', () => {
  let service: TotalFarms;

  beforeEach(() => {
    service = new TotalFarms();
  });

  it('should return the total number of farms', async () => {
    jest.spyOn(prismaClient.farm, 'count').mockResolvedValueOnce(10);

    const totalFarms = await service.execute();

    expect(totalFarms).toBe(10);
    expect(prismaClient.farm.count).toHaveBeenCalled();
  });
});
