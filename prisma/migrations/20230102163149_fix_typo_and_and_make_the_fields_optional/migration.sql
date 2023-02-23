/*
  Warnings:

  - You are about to drop the column `emailChangeToken` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "emailChangeToken",
ADD COLUMN     "emailVerifyToken" TEXT;
