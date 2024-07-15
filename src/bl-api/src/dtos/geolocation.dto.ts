import { IsString, IsNumber, IsOptional } from 'class-validator';

export class GeolocationDto {
  @IsOptional()
  @IsNumber()
  geo_id: number;

  @IsString()
  type: string;

  @IsString()
  coordinates: string;
}
