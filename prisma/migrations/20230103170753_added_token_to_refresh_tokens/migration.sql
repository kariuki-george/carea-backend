/*
  Warnings:

  - Added the required column `token` to the `refreshTokens` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "refreshTokens" ADD COLUMN     "token" TEXT NOT NULL;
