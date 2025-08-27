/*
  Warnings:

  - You are about to drop the column `userId` on the `Address` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Address" DROP CONSTRAINT "Address_userId_fkey";

-- AlterTable
ALTER TABLE "public"."Address" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "public"."Store" ALTER COLUMN "phone" SET NOT NULL,
ALTER COLUMN "phone" SET DATA TYPE TEXT;
