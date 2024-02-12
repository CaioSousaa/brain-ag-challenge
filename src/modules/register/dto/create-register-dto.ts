import { Crops } from '@prisma/client';

export interface ICreateRegisterDTO {
  legalId: string;
  name: string;
  farm_name: string;
  city: string;
  state: string;
  ttl_hectares: number;
  plantable_area: number;
  vegetation_area: number;
  planted_crops: Crops[];
}
