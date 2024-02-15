import { Farm } from '@prisma/client';

const farmsWithCrops: Farm[] = [
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
    planted_crops: ['coffee', 'cotton'],
  },
  {
    id: 2,
    legalId: '003.000.999-12',
    name: 'Jonh Doe',
    farm_name: 'Farm John Doe',
    city: 'city',
    state: 'state',
    ttl_hectares: 20,
    plantable_area: 7,
    vegetation_area: 3,
    planted_crops: ['coffee', 'cotton'],
  },
  {
    id: 3,
    legalId: '193.000.999-12',
    name: 'Jonh Doe',
    farm_name: 'Farm John Doe',
    city: 'city',
    state: 'state',
    ttl_hectares: 20,
    plantable_area: 7,
    vegetation_area: 3,
    planted_crops: ['coffee', 'cotton'],
  },
];

const prismaMock = {
  farm: {
    findMany: jest.fn().mockResolvedValue(farmsWithCrops),
    findFirst: jest.fn().mockResolvedValue(farmsWithCrops[0]),
    findUnique: jest.fn().mockResolvedValue(farmsWithCrops[0]),
    groupBy: jest.fn().mockResolvedValue(farmsWithCrops[0]),
  },
};

export { farmsWithCrops, prismaMock };
