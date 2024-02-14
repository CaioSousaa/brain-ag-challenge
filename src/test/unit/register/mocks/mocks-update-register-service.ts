const mockPrismaClient = {
  farm: {
    findMany: jest.fn(),
    update: jest.fn(),
  },
};

export { mockPrismaClient };
