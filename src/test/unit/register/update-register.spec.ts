import { UpdateRegisterService } from 'src/modules/register/services/update-register.service';
import { UpdateRegisterDTO } from 'src/modules/register/dto/update-register-dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { fakeCreateRegister, prismaMock } from './mocks/mocks-register';

describe('UpdateRegisterService', () => {
  let service: UpdateRegisterService;

  beforeEach(async () => {
    const prismaService = new PrismaService();
    service = new UpdateRegisterService(prismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should throw NotFoundException if the record does not exist', async () => {
    const nonExistingId = '999';

    await expect(
      service.execute(nonExistingId, {} as UpdateRegisterDTO),
    ).rejects.toThrow(NotFoundException);
  });

  it('should throw Error if the size of the land exceeded', async () => {
    const existingRegister = fakeCreateRegister[0];
    const updateData: UpdateRegisterDTO = {
      legalId: '13.486.719/0001-12',
      name: 'New Name',
      farm_name: 'New Farm Name',
      ttl_hectares: 20,
      plantable_area: 30,
      vegetation_area: 20,
      planted_crops: [],
    };

    prismaMock.farm.findUnique.mockResolvedValueOnce(existingRegister);

    await expect(
      service.execute(existingRegister.id.toString(), updateData),
    ).rejects.toThrow(Error);
  });

  it('should throw UnauthorizedException if the legalId is in use by another record', async () => {
    const existingRegister = fakeCreateRegister[0];
    const updateData: UpdateRegisterDTO = {
      legalId: '626.213.423-23',
    };

    await expect(
      service.execute(existingRegister.id.toString(), updateData),
    ).rejects.toThrow(NotFoundException);
  });

  it('should throw Error if the size of the land exceeded', async () => {
    const existingRegister = fakeCreateRegister[0];
    const updateData: UpdateRegisterDTO = {
      legalId: '13.486.719/0001-12',
      name: 'New Name',
      farm_name: 'New Farm Name',
      ttl_hectares: 20,
      plantable_area: 30,
      vegetation_area: 20,
      planted_crops: [],
    };

    prismaMock.farm.findUnique.mockResolvedValueOnce(existingRegister);

    await expect(
      service.execute(existingRegister.id.toString(), updateData),
    ).rejects.toThrow(Error);
  });
});
