/*
  Warnings:

  - The primary key for the `refreshToken` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `refreshToken` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "refreshToken" DROP CONSTRAINT "refreshToken_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "refreshToken_pkey" PRIMARY KEY ("userId");
