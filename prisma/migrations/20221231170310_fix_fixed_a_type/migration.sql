/*
  Warnings:

  - Changed the type of `userId` on the `offer` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `addressId` on the `order` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `carId` on the `order` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "offer" DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "order" DROP COLUMN "addressId",
ADD COLUMN     "addressId" INTEGER NOT NULL,
DROP COLUMN "carId",
ADD COLUMN     "carId" INTEGER NOT NULL;
