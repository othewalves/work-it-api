/*
  Warnings:

  - Added the required column `banner` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cover` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "banner" TEXT NOT NULL,
ADD COLUMN     "cover" TEXT NOT NULL;
