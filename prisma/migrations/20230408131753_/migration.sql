/*
  Warnings:

  - The values [PROCESSING,DELIVERY,COMPLETED,CANCELLED,REFUND] on the enum `OrderStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `offerId` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the `chats` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `messages` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `offers` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "OrderStatus_new" AS ENUM ('PAID', 'UNPAID');
ALTER TABLE "orders" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "orders" ALTER COLUMN "status" TYPE "OrderStatus_new" USING ("status"::text::"OrderStatus_new");
ALTER TYPE "OrderStatus" RENAME TO "OrderStatus_old";
ALTER TYPE "OrderStatus_new" RENAME TO "OrderStatus";
DROP TYPE "OrderStatus_old";
ALTER TABLE "orders" ALTER COLUMN "status" SET DEFAULT 'UNPAID';
COMMIT;

-- DropForeignKey
ALTER TABLE "chats" DROP CONSTRAINT "chats_carId_fkey";

-- DropForeignKey
ALTER TABLE "chats" DROP CONSTRAINT "chats_userId_fkey";

-- DropForeignKey
ALTER TABLE "messages" DROP CONSTRAINT "messages_chatId_fkey";

-- DropForeignKey
ALTER TABLE "offers" DROP CONSTRAINT "offers_carId_fkey";

-- DropForeignKey
ALTER TABLE "offers" DROP CONSTRAINT "offers_userId_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_offerId_fkey";

-- DropIndex
DROP INDEX "orders_offerId_key";

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "offerId",
ALTER COLUMN "status" SET DEFAULT 'UNPAID';

-- DropTable
DROP TABLE "chats";

-- DropTable
DROP TABLE "messages";

-- DropTable
DROP TABLE "offers";

-- DropEnum
DROP TYPE "OfferStatus";
