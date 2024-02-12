-- CreateEnum
CREATE TYPE "Crops" AS ENUM ('soybean', 'corn', 'cotton', 'coffee', 'sugar_cane');

-- CreateTable
CREATE TABLE "farm" (
    "id" SERIAL NOT NULL,
    "legalId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "farm_name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "ttl_hectares" INTEGER NOT NULL,
    "plantable_area" INTEGER NOT NULL,
    "vegetation_area" INTEGER NOT NULL,
    "planted_crops" "Crops"[],

    CONSTRAINT "farm_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "farm_legalId_key" ON "farm"("legalId");
