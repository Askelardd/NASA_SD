// nasa.model.ts
import { z } from 'zod';

export const GeolocationSchema = z.object({
  geo_id: z.number().optional(),
  type: z.string(),
  coordinates: z.string(),
});

export const NasaInsertSchema = z.object({
  name: z.string(),
  nametype: z.string(),
  recclass: z.string(),
  mass: z.number(),
  fall: z.string(),
  year: z.date(),
  reclat: z.number(),
  reclong: z.number(),
  geolocation: GeolocationSchema,
});

export type NasaInsert = z.infer<typeof NasaInsertSchema>;

export const NasaSchema = NasaInsertSchema.extend({
  nasa_id: z.number(),
});

export type Nasa = z.infer<typeof NasaSchema>;
