/*
  Warnings:

  - A unique constraint covering the columns `[createdAt]` on the table `cars` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "cars" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "cars_createdAt_key" ON "cars"("createdAt");
