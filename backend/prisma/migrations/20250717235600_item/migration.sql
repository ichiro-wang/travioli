/*
  Warnings:

  - You are about to drop the column `estimatedCost` on the `ItineraryItem` table. All the data in the column will be lost.
  - Made the column `coordinates` on table `Location` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ItineraryItem" DROP COLUMN "estimatedCost",
ADD COLUMN     "cost" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Location" ALTER COLUMN "coordinates" SET NOT NULL;
