/*
  Warnings:

  - The primary key for the `Geolocation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Geolocation` table. All the data in the column will be lost.
  - The primary key for the `Nasa` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `geolocationId` on the `Nasa` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Nasa` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[geolocationid]` on the table `Nasa` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Nasa" DROP CONSTRAINT "Nasa_geolocationId_fkey";

-- DropIndex
DROP INDEX "Nasa_geolocationId_key";

-- AlterTable
ALTER TABLE "Geolocation" DROP CONSTRAINT "Geolocation_pkey",
DROP COLUMN "id",
ADD COLUMN     "geo_id" SERIAL NOT NULL,
ADD CONSTRAINT "Geolocation_pkey" PRIMARY KEY ("geo_id");

-- AlterTable
ALTER TABLE "Nasa" DROP CONSTRAINT "Nasa_pkey",
DROP COLUMN "geolocationId",
DROP COLUMN "id",
ADD COLUMN     "geolocationid" SERIAL NOT NULL,
ADD COLUMN     "nasa_id" SERIAL NOT NULL,
ADD CONSTRAINT "Nasa_pkey" PRIMARY KEY ("nasa_id");

-- CreateIndex
CREATE UNIQUE INDEX "Nasa_geolocationid_key" ON "Nasa"("geolocationid");

-- AddForeignKey
ALTER TABLE "Nasa" ADD CONSTRAINT "Nasa_geolocationid_fkey" FOREIGN KEY ("geolocationid") REFERENCES "Geolocation"("geo_id") ON DELETE RESTRICT ON UPDATE CASCADE;
