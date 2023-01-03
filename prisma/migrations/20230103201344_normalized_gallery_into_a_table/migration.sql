/*
  Warnings:

  - You are about to drop the column `gallery` on the `cars` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "cars" DROP COLUMN "gallery";

-- CreateTable
CREATE TABLE "carGallery" (
    "id" SERIAL NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "carId" INTEGER NOT NULL,

    CONSTRAINT "carGallery_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "carGallery" ADD CONSTRAINT "carGallery_carId_fkey" FOREIGN KEY ("carId") REFERENCES "cars"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
