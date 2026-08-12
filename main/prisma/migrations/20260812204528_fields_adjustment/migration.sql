/*
  Warnings:

  - The `width` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "width",
ADD COLUMN     "width" INTEGER NOT NULL DEFAULT 0;
