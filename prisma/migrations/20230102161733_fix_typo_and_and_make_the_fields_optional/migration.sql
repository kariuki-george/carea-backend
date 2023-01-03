/*
  Warnings:

  - You are about to drop the column `emaiChangeToken` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "emaiChangeToken",
ADD COLUMN     "emailChangeToken" TEXT,
ALTER COLUMN "lastSignInAt" DROP NOT NULL;
