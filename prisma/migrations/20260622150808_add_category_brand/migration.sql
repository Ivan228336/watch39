/*
  Warnings:

  - The primary key for the `Watch` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `brand` on the `Watch` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `Watch` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Watch` table. All the data in the column will be lost.
  - You are about to drop the column `model` on the `Watch` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Watch` table. All the data in the column will be lost.
  - You are about to alter the column `price` on the `Watch` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - A unique constraint covering the columns `[modelCode]` on the table `Watch` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Watch` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `brandId` to the `Watch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryId` to the `Watch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `modelCode` to the `Watch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Watch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Watch` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `Watch` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Watch" DROP CONSTRAINT "Watch_pkey",
DROP COLUMN "brand",
DROP COLUMN "category",
DROP COLUMN "createdAt",
DROP COLUMN "model",
DROP COLUMN "updatedAt",
ADD COLUMN     "brandId" TEXT NOT NULL,
ADD COLUMN     "categoryId" TEXT NOT NULL,
ADD COLUMN     "h1" TEXT,
ADD COLUMN     "metaDescription" TEXT,
ADD COLUMN     "metaTitle" TEXT,
ADD COLUMN     "modelCode" TEXT NOT NULL,
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "stockKaliningrad" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "title" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "price" SET DATA TYPE INTEGER,
ALTER COLUMN "description" SET NOT NULL,
ADD CONSTRAINT "Watch_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Watch_id_seq";

-- CreateTable
CREATE TABLE "Brand" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "metaTitle" TEXT,
    "metaDescription" TEXT,

    CONSTRAINT "Brand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "metaTitle" TEXT,
    "metaDescription" TEXT,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Brand_name_key" ON "Brand"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Brand_slug_key" ON "Brand"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Watch_modelCode_key" ON "Watch"("modelCode");

-- CreateIndex
CREATE UNIQUE INDEX "Watch_slug_key" ON "Watch"("slug");

-- AddForeignKey
ALTER TABLE "Watch" ADD CONSTRAINT "Watch_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Watch" ADD CONSTRAINT "Watch_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
