import { CreateRegisterService } from 'src/modules/register/services/create-register.service';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Crops } from '@prisma/client';

const mockPrismaClient = {
  farm: {
    findUnique: jest.fn(),
    create: jest.fn(),
  },
};

describe('CreateRegisterService', () => {
  let createRegisterService: CreateRegisterService;

  beforeEach(() => {
    createRegisterService = new CreateRegisterService();
    createRegisterService['prismaClient'] = mockPrismaClient;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should throw ConflictException if legalId already exists', async () => {
    mockPrismaClient.farm.findUnique.mockResolvedValue({});

    const legalIdToCheck = 'legalIdExistente';
    const otherParams = {
      name: 'Name',
      farm_name: 'Farm Name',
      city: 'City',
      state: 'State',
      ttl_hectares: 100,
      plantable_area: 80,
      vegetation_area: 20,
      planted_crops: [] as Crops[],
    };

    await expect(
      createRegisterService.execute({
        legalId: legalIdToCheck,
        ...otherParams,
      }),
    ).rejects.toThrow(ConflictException);

    expect(mockPrismaClient.farm.findUnique).toHaveBeenCalledTimes(1);
    expect(mockPrismaClient.farm.findUnique).toHaveBeenCalledWith({
      where: {
        legalId: legalIdToCheck,
      },
    });
  });

  it('should throw InternalServerErrorException if PrismaClient fails', async () => {
    mockPrismaClient.farm.findUnique.mockRejectedValue(new Error());

    const legalIdToCheck = 'legalIdParaErroInterno';
    const otherParams = {
      name: 'Name',
      farm_name: 'Farm Name',
      city: 'City',
      state: 'State',
      ttl_hectares: 100,
      plantable_area: 80,
      vegetation_area: 20,
      planted_crops: [] as Crops[],
    };

    await expect(
      createRegisterService.execute({
        legalId: legalIdToCheck,
        ...otherParams,
      }),
    ).rejects.toThrow(InternalServerErrorException);

    expect(mockPrismaClient.farm.findUnique).toHaveBeenCalledTimes(1);
    expect(mockPrismaClient.farm.findUnique).toHaveBeenCalledWith({
      where: {
        legalId: legalIdToCheck,
      },
    });
  });

  it('should throw BadRequestException if total area exceeded', async () => {
    const legalIdToCheck = 'legalIdExceededArea';
    const otherParams = {
      name: 'Name',
      farm_name: 'Farm Name',
      city: 'City',
      state: 'State',
      ttl_hectares: 100,
      plantable_area: 90,
      vegetation_area: 20,
      planted_crops: [] as Crops[],
    };

    await expect(
      createRegisterService.execute({
        legalId: legalIdToCheck,
        ...otherParams,
      }),
    ).rejects.toThrow();
  });

  it('should throw BadRequestException if legalId is invalid', async () => {
    const legalIdToCheck = 'invalidLegalId';
    const otherParams = {
      name: 'Name',
      farm_name: 'Farm Name',
      city: 'City',
      state: 'State',
      ttl_hectares: 100,
      plantable_area: 80,
      vegetation_area: 20,
      planted_crops: [] as Crops[],
    };

    await expect(
      createRegisterService.execute({
        legalId: legalIdToCheck,
        ...otherParams,
      }),
    ).rejects.toThrow();
  });

  it('should throw BadRequestException if required fields are blank', async () => {
    const legalIdToCheck = 'legalIdWithBlankFields';
    const otherParams = {
      name: '',
      farm_name: '',
      city: '',
      state: '',
      ttl_hectares: 100,
      plantable_area: 80,
      vegetation_area: 20,
      planted_crops: [] as Crops[],
    };

    await expect(
      createRegisterService.execute({
        legalId: legalIdToCheck,
        ...otherParams,
      }),
    ).rejects.toThrow();
  });

  it('should throw BadRequestException if planted crops list is empty', async () => {
    const legalIdToCheck = 'legalIdWithEmptyPlantedCrops';
    const otherParams = {
      name: 'Name',
      farm_name: 'Farm Name',
      city: 'City',
      state: 'State',
      ttl_hectares: 100,
      plantable_area: 80,
      vegetation_area: 20,
      planted_crops: [],
    };

    await expect(
      createRegisterService.execute({
        legalId: legalIdToCheck,
        ...otherParams,
      }),
    ).rejects.toThrow();
  });

  it('should create a new farm entry if all data is valid', async () => {
    const legalIdToCheck = 'validLegalId';
    const otherParams = {
      name: 'Name',
      farm_name: 'Farm Name',
      city: 'City',
      state: 'State',
      ttl_hectares: 100,
      plantable_area: 80,
      vegetation_area: 20,
      planted_crops: [] as Crops[],
    };

    mockPrismaClient.farm.create.mockResolvedValue({ id: 1 });

    await expect(
      createRegisterService.execute({
        legalId: legalIdToCheck,
        ...otherParams,
      }),
    ).resolves.toEqual({ id: 1 });

    expect(mockPrismaClient.farm.create).toHaveBeenCalledTimes(1);
    expect(mockPrismaClient.farm.create).toHaveBeenCalledWith({
      data: {
        legalId: legalIdToCheck,
        ...otherParams,
      },
    });
  });
});
