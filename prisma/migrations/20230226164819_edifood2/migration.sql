/*
  Warnings:

  - You are about to drop the column `description` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `instructions` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `raters` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `Recipe` table. All the data in the column will be lost.
  - The `ingredients` column on the `Recipe` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Rating` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `label` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalTime` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `yield` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_recipeId_fkey";

-- DropForeignKey
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_userId_fkey";

-- DropForeignKey
ALTER TABLE "Recipe" DROP CONSTRAINT "Recipe_userId_fkey";

-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "description",
DROP COLUMN "instructions",
DROP COLUMN "name",
DROP COLUMN "raters",
DROP COLUMN "rating",
ADD COLUMN     "Nutrients" TEXT[],
ADD COLUMN     "cuisineType" TEXT[],
ADD COLUMN     "dishType" TEXT[],
ADD COLUMN     "healthLabels" TEXT[],
ADD COLUMN     "label" TEXT NOT NULL,
ADD COLUMN     "mealType" TEXT[],
ADD COLUMN     "totalTime" INTEGER NOT NULL,
ADD COLUMN     "yield" INTEGER NOT NULL,
DROP COLUMN "ingredients",
ADD COLUMN     "ingredients" TEXT[];

-- DropTable
DROP TABLE "Rating";
