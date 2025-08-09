/*
  Warnings:

  - You are about to drop the column `addressId` on the `Store` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Store` table. All the data in the column will be lost.
  - You are about to drop the column `legalName` on the `Store` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Store` table. All the data in the column will be lost.
  - The `phone` column on the `Store` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Admin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Merchant` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `userId` on table `Address` required. This step will fail if there are existing NULL values in that column.
  - Made the column `storeId` on table `Address` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `Store` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."Address" DROP CONSTRAINT "Address_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Admin" DROP CONSTRAINT "Admin_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Merchant" DROP CONSTRAINT "Merchant_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Store" DROP CONSTRAINT "Store_addressId_fkey";

-- DropIndex
DROP INDEX "public"."Address_userId_key";

-- DropIndex
DROP INDEX "public"."Store_addressId_key";

-- DropIndex
DROP INDEX "public"."Store_cnpj_key";

-- DropIndex
DROP INDEX "public"."Store_userId_key";

-- AlterTable
ALTER TABLE "public"."Address" ALTER COLUMN "userId" SET NOT NULL,
ALTER COLUMN "storeId" SET NOT NULL;

-- AlterTable
ALTER TABLE "public"."Store" DROP COLUMN "addressId",
DROP COLUMN "createdAt",
DROP COLUMN "legalName",
DROP COLUMN "updatedAt",
ADD COLUMN     "photo" TEXT,
ADD COLUMN     "slogan" TEXT,
DROP COLUMN "phone",
ADD COLUMN     "phone" TEXT[],
ALTER COLUMN "email" SET NOT NULL;

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "photo" TEXT,
ALTER COLUMN "role" SET DEFAULT 'CLIENT';

-- DropTable
DROP TABLE "public"."Admin";

-- DropTable
DROP TABLE "public"."Merchant";

-- AddForeignKey
ALTER TABLE "public"."Address" ADD CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Address" ADD CONSTRAINT "Address_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "public"."Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
