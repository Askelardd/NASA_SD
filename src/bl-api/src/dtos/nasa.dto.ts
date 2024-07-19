// nasa.dto.ts
export class GeolocationDto {
  geo_id?: number;
  type: string;
  coordinates: string;
}

export class NasaDto {
  nasa_id?: number;
  name: string;
  nametype: string;
  recclass: string;
  mass: number;
  fall: string;
  year: Date;
  reclat: number;
  reclong: number;
  geo_id?: number;
  geolocation: GeolocationDto;
}
