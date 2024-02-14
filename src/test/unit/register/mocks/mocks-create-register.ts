const mockPrismaClient = {
  farm: {
    findUnique: jest.fn(),
    create: jest.fn(),
  },
};

export { mockPrismaClient };
