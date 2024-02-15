import { DeleteRegisterService } from 'src/modules/register/services/delete-register.service';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { fakeCreateRegister } from './mocks/mocks-register';

describe('DeleteRegisterService', () => {
  let service: DeleteRegisterService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    prismaService = new PrismaService();
    service = new DeleteRegisterService(prismaService);
  });

  it('should delete the register if it exists', async () => {
    const existingRegister = fakeCreateRegister[0];

    jest
      .spyOn(prismaService.farm, 'findUnique')
      .mockResolvedValue(existingRegister);
    jest
      .spyOn(prismaService.farm, 'delete')
      .mockResolvedValue(existingRegister);

    await expect(
      service.execute(existingRegister.id.toString()),
    ).resolves.toBeUndefined();
  });

  it('should throw NotFoundException if the register does not exist', async () => {
    const nonExistingId = '1000';

    jest.spyOn(prismaService.farm, 'findUnique').mockResolvedValue(null);

    await expect(service.execute(nonExistingId)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should throw InternalServerErrorException if an internal error occurs', async () => {
    const existingRegister = fakeCreateRegister[0];

    jest
      .spyOn(prismaService.farm, 'findUnique')
      .mockResolvedValue(existingRegister);
    jest
      .spyOn(prismaService.farm, 'delete')
      .mockRejectedValue(new InternalServerErrorException());

    await expect(
      service.execute(existingRegister.id.toString()),
    ).rejects.toThrow(InternalServerErrorException);
  });
});
