import { Test, TestingModule } from '@nestjs/testing';
import { CreateRegisterService } from 'src/modules/register/services/create-register.service';
import { ConflictException } from '@nestjs/common';
import { fakeCreateRegister, prismaMock } from './mocks/mocks-register';
import { PrismaService } from 'src/prisma/prisma.service';

describe('CreateRegisterService', () => {
  let service: CreateRegisterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateRegisterService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<CreateRegisterService>(CreateRegisterService);
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throw InternalServerErrorException for other internal errors', async () => {
    const internalErrorRegister = { ...fakeCreateRegister[0] };

    prismaMock.farm.create.mockRejectedValueOnce(
      new Error('Internal Server Error'),
    );

    await expect(service.execute(internalErrorRegister)).rejects.toThrow(
      ConflictException,
    );
  });

  it('should throw ConflictException if the legalId format is invalid', async () => {
    const invalidRegister = { ...fakeCreateRegister[0], legalId: 'invalid_id' };

    await expect(service.execute(invalidRegister)).rejects.toThrow(
      ConflictException,
    );
  });

  it('should throw ConflictException if the legalId already exists in a record', async () => {
    const existingRegister = fakeCreateRegister[0];

    prismaMock.farm.findUnique.mockResolvedValueOnce(existingRegister);

    await expect(service.execute(existingRegister)).rejects.toThrow(
      ConflictException,
    );
  });

  it('should throw ConflictException if the legalId already exists in a record', async () => {
    const existingRegister = fakeCreateRegister[0];

    prismaMock.farm.findUnique.mockResolvedValueOnce(existingRegister);

    await expect(service.execute(existingRegister)).rejects.toThrow(
      ConflictException,
    );
  });
});
