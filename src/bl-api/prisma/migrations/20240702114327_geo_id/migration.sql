/*
  Warnings:

  - You are about to drop the column `geolocationid` on the `Nasa` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[geo_id]` on the table `Nasa` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Nasa" DROP CONSTRAINT "Nasa_geolocationid_fkey";

-- DropIndex
DROP INDEX "Nasa_geolocationid_key";

-- AlterTable
ALTER TABLE "Nasa" DROP COLUMN "geolocationid",
ADD COLUMN     "geo_id" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Nasa_geo_id_key" ON "Nasa"("geo_id");

-- AddForeignKey
ALTER TABLE "Nasa" ADD CONSTRAINT "Nasa_geo_id_fkey" FOREIGN KEY ("geo_id") REFERENCES "Geolocation"("geo_id") ON DELETE RESTRICT ON UPDATE CASCADE;
