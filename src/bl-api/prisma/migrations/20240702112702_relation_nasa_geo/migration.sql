-- AlterTable
CREATE SEQUENCE nasa_geolocationid_seq;
ALTER TABLE "Nasa" ALTER COLUMN "geolocationId" SET DEFAULT nextval('nasa_geolocationid_seq');
ALTER SEQUENCE nasa_geolocationid_seq OWNED BY "Nasa"."geolocationId";
