/*
  Warnings:

  - You are about to drop the `refreshToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "refreshToken" DROP CONSTRAINT "refreshToken_userId_fkey";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "refreshToken" TEXT;

-- DropTable
DROP TABLE "refreshToken";
