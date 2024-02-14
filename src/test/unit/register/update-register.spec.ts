import { UpdateRegisterService } from 'src/modules/register/services/update-register.service';
import {
  NotFoundException,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { UpdateRegisterDTO } from 'src/modules/register/dto/update-register-dto';
import { Crops } from '@prisma/client';

const mockPrismaClient = {
  farm: {
    findUnique: jest.fn(),
    findFirst: jest.fn(),
    update: jest.fn(),
  },
};

describe('UpdateRegisterService', () => {
  let updateRegisterService: UpdateRegisterService;

  beforeEach(() => {
    updateRegisterService = new UpdateRegisterService();
    updateRegisterService['prismaClient'] = mockPrismaClient;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should update farm successfully', async () => {
    const mockFarmId = '1';
    const mockFarmData: UpdateRegisterDTO = {
      legalId: '123.456.789-00',
      name: 'Green Acres Farm',
      ttl_hectares: 100,
      plantable_area: 80,
      vegetation_area: 20,
      planted_crops: [] as Crops[],
    };
    const updatedFarmData = { ...mockFarmData };

    mockPrismaClient.farm.findUnique.mockResolvedValueOnce(mockFarmData as any);
    mockPrismaClient.farm.update.mockResolvedValueOnce(updatedFarmData as any);

    const result = await updateRegisterService.execute(
      mockFarmId,
      mockFarmData,
    );
    expect(result).toEqual(updatedFarmData);
  });

  it('should throw NotFoundException if farm does not exist', async () => {
    const mockFarmId = '1';
    mockPrismaClient.farm.findUnique.mockResolvedValueOnce(null);

    await expect(
      updateRegisterService.execute(mockFarmId, {} as UpdateRegisterDTO),
    ).rejects.toThrow(NotFoundException);
  });

  it('should throw UnauthorizedException if legalId is invalid or already in use', async () => {
    const mockFarmId = '1';
    const mockFarmData: UpdateRegisterDTO = {
      legalId: '1',
      name: 'Green Acres Farm',
      ttl_hectares: 100,
      plantable_area: 80,
      vegetation_area: 20,
      planted_crops: [] as Crops[],
    };

    mockPrismaClient.farm.findUnique.mockResolvedValueOnce(mockFarmData as any);
    mockPrismaClient.farm.findFirst.mockResolvedValueOnce({} as any);

    await expect(
      updateRegisterService.execute(mockFarmId, mockFarmData),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('should throw Error if area is invalid', async () => {
    const mockFarmId = '1';
    const mockFarmData: UpdateRegisterDTO = {
      legalId: '123.456.789-00',
      name: 'Green Acres Farm',
      ttl_hectares: 100,
      plantable_area: 80,
      vegetation_area: 50,
      planted_crops: [] as Crops[],
    };

    mockPrismaClient.farm.findUnique.mockResolvedValueOnce(mockFarmData as any);

    await expect(
      updateRegisterService.execute(mockFarmId, mockFarmData),
    ).rejects.toThrow(Error);
  });

  it('should throw InternalServerErrorException if server error occurs', async () => {
    const mockFarmId = '1';
    const mockFarmData: UpdateRegisterDTO = {
      legalId: '123.456.789-00',
      name: 'Green Acres Farm',
      ttl_hectares: 100,
      plantable_area: 80,
      vegetation_area: 50,
      planted_crops: [] as Crops[],
    };

    mockPrismaClient.farm.findUnique.mockRejectedValueOnce(new Error());

    await expect(
      updateRegisterService.execute(mockFarmId, mockFarmData),
    ).rejects.toThrow(InternalServerErrorException);
  });
});
