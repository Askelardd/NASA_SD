import { IsString, IsNumber, IsDate, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { GeolocationDto } from './geolocation.dto';

export class NasaDto {
  @IsOptional()
  @IsNumber()
  nasa_id: number;

  @IsString()
  name: string;

  @IsString()
  nametype: string;

  @IsString()
  recclass: string;

  @IsNumber()
  mass: number;

  @IsString()
  fall: string;

  @IsDate()
  @Type(() => Date)
  year: Date;

  @IsNumber()
  reclat: number;

  @IsNumber()
  reclong: number;

  @IsOptional()
  @IsNumber()
  geo_id: number;

  @ValidateNested()
  @Type(() => GeolocationDto)
  geolocation: GeolocationDto;
}
