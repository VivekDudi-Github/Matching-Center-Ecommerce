/*
  Warnings:

  - You are about to drop the column `slug` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `dimensions` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `_CategoryToProduct` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[sku]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `categoryId` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sku` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lowStockAlert` to the `ProductVariant` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_CategoryToProduct" DROP CONSTRAINT "_CategoryToProduct_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToProduct" DROP CONSTRAINT "_CategoryToProduct_B_fkey";

-- DropIndex
DROP INDEX "Category_slug_key";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "slug";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "dimensions",
ADD COLUMN     "categoryId" INTEGER NOT NULL,
ADD COLUMN     "seoDescription" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "seoTitle" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "sku" TEXT NOT NULL,
ADD COLUMN     "washCare" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "width" TEXT NOT NULL DEFAULT '[]';

-- AlterTable
ALTER TABLE "ProductVariant" ADD COLUMN     "lowStockAlert" DECIMAL(10,2) NOT NULL;

-- DropTable
DROP TABLE "_CategoryToProduct";

-- CreateIndex
CREATE UNIQUE INDEX "Product_sku_key" ON "Product"("sku");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
