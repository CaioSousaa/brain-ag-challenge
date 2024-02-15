const fakeCreateRegister = [
  {
    id: 1,
    legalId: '093.000.999-12',
    name: 'Jonh Doe',
    farm_name: 'Farm John Doe',
    city: 'city',
    state: 'state',
    ttl_hectares: 20,
    plantable_area: 7,
    vegetation_area: 3,
    planted_crops: [],
  },

  {
    id: 2,
    legalId: '23.456.789/0001-12',
    name: 'Jonh Doe',
    farm_name: 'Farm John Doe',
    city: 'city',
    state: 'state',
    ttl_hectares: 20,
    plantable_area: 7,
    vegetation_area: 3,
    planted_crops: [],
  },

  {
    id: 5,
    legalId: '13.486.719/0001-12',
    name: 'Jonh Doe',
    farm_name: 'Farm John Doe',
    city: 'city',
    state: 'state',
    ttl_hectares: 20,
    plantable_area: 17,
    vegetation_area: 9,
    planted_crops: [],
  },
];

const prismaMock = {
  farm: {
    create: jest.fn().mockReturnValue(fakeCreateRegister[0]),
    findMany: jest.fn().mockResolvedValue(fakeCreateRegister),
    findFirst: jest.fn().mockResolvedValue(fakeCreateRegister[0]),
    findUnique: jest.fn().mockResolvedValue(fakeCreateRegister[0]),
    update: jest.fn().mockResolvedValue(fakeCreateRegister[0]),
    delete: jest.fn(),
  },
};

export { fakeCreateRegister, prismaMock };
