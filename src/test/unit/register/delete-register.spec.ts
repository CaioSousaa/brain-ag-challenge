import { DeleteRegisterService } from 'src/modules/register/services/delete-register.service';
import {
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';

const mockPrismaClient = {
  farm: {
    findUnique: jest.fn(),
    delete: jest.fn(),
  },
};

describe('DeleteRegisterService', () => {
  let deleteRegisterService: DeleteRegisterService;

  beforeEach(() => {
    deleteRegisterService = new DeleteRegisterService();
    deleteRegisterService['prismaClient'] = mockPrismaClient;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should delete farm successfully', async () => {
    const mockFarmId = '1';
    const mockFarmData = {
      legalId: '123.456.789-00',
      name: 'Green Acres Farm',
      ttl_hectares: 100,
      plantable_area: 80,
      vegetation_area: 20,
      planted_crops: [],
    };

    mockPrismaClient.farm.findUnique.mockResolvedValueOnce(mockFarmData as any);

    await deleteRegisterService.execute(mockFarmId);

    expect(mockPrismaClient.farm.delete).toHaveBeenCalledTimes(1);
    expect(mockPrismaClient.farm.delete).toHaveBeenCalledWith({
      where: { id: mockFarmData.legalId },
    });
  });

  it('should throw NotFoundException if farm does not exist', async () => {
    const mockFarmId = '1';

    mockPrismaClient.farm.findUnique.mockResolvedValueOnce(null);

    await expect(deleteRegisterService.execute(mockFarmId)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should throw InternalServerErrorException if server error occurs', async () => {
    const mockFarmId = '1';
    const mockFarmData = {
      legalId: '123.456.789-00',
      name: 'Green Acres Farm',
      ttl_hectares: 100,
      plantable_area: 80,
      vegetation_area: 20,
      planted_crops: [],
    };

    mockPrismaClient.farm.findUnique.mockResolvedValueOnce(mockFarmData as any);
    mockPrismaClient.farm.delete.mockRejectedValueOnce(new Error());

    await expect(deleteRegisterService.execute(mockFarmId)).rejects.toThrow(
      InternalServerErrorException,
    );
  });
});
