/*
  Warnings:

  - Added the required column `pattern` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `ProductImages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "pattern" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ProductImages" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE INDEX "ProductImages_productId_idx" ON "ProductImages"("productId");
