-- CreateTable
CREATE TABLE "Nasa" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "nametype" TEXT NOT NULL,
    "recclass" TEXT NOT NULL,
    "mass" DOUBLE PRECISION NOT NULL,
    "fall" TEXT NOT NULL,
    "year" TIMESTAMP(3) NOT NULL,
    "reclat" DOUBLE PRECISION NOT NULL,
    "reclong" DOUBLE PRECISION NOT NULL,
    "geolocationId" INTEGER NOT NULL,

    CONSTRAINT "Nasa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Geolocation" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "coordinates" TEXT NOT NULL,

    CONSTRAINT "Geolocation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teachers" (
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "created_on" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_on" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "teachers_pkey" PRIMARY KEY ("name")
);

-- CreateIndex
CREATE UNIQUE INDEX "Nasa_geolocationId_key" ON "Nasa"("geolocationId");

-- AddForeignKey
ALTER TABLE "Nasa" ADD CONSTRAINT "Nasa_geolocationId_fkey" FOREIGN KEY ("geolocationId") REFERENCES "Geolocation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
