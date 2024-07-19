import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Nasa, NasaInsert, NasaInsertSchema } from '../models/nasa.model';
import { Prisma } from '@prisma/client';

@Injectable()
export class NasaService {
  constructor(private readonly prisma: PrismaService) {}

  async findMany(): Promise<Nasa[]> {
    const nasaRecords = await this.prisma.nasa.findMany({
      include: {
        geolocation: true,
      },
    });
    return nasaRecords;
  }

  async findUnique(nasa_id: number): Promise<Nasa> {
    try {
      const nasaRecord = await this.prisma.nasa.findUnique({
        where: {
          nasa_id: nasa_id,
        },
        include: {
          geolocation: true,
        },
      });
      if (!nasaRecord) {
        throw new NotFoundException(`Nasa record with id ${nasa_id} not found`);
      }
      return nasaRecord;
    } catch (error) {
      throw new Error('Ocorreu um erro ao tentar encontrar o registro da NASA');
    }
  }

  async create(nasa: NasaInsert): Promise<Nasa> {
    try {
      const validatedNasa = NasaInsertSchema.parse(nasa);

      const newNasa = await this.prisma.nasa.create({
        data: {
          ...validatedNasa,
          geolocation: {
            connectOrCreate: {
              where: { geo_id: validatedNasa.geolocation.geo_id },
              create: {
                type: validatedNasa.geolocation.type,
                coordinates: validatedNasa.geolocation.coordinates,
              },
            },
          },
        } as Prisma.NasaCreateInput,
        include: {
          geolocation: true,
        },
      });

      return newNasa;
    } catch (error) {
      throw new Error('Erro ao inserir o registro da NASA: ' + error.message);
    }
  }

  async update(nasa_id: number, nasa: NasaInsert): Promise<Nasa> {
    try {
      const validatedNasa = NasaInsertSchema.parse(nasa);

      const updatedNasa = await this.prisma.nasa.update({
        where: { nasa_id: nasa_id },
        data: {
          ...validatedNasa,
          geolocation: {
            connectOrCreate: {
              where: { geo_id: validatedNasa.geolocation.geo_id },
              create: {
                type: validatedNasa.geolocation.type,
                coordinates: validatedNasa.geolocation.coordinates,
              },
            },
          },
        } as Prisma.NasaUpdateInput,
        include: {
          geolocation: true,
        },
      });

      if (!updatedNasa) {
        throw new NotFoundException(`Nasa with ID ${nasa_id} not found.`);
      }

      return updatedNasa;
    } catch (error) {
      throw new Error('Erro ao atualizar o registro da NASA: ' + error.message);
    }
  }

  async remove(nasa_id: number): Promise<void> {
    try {
      await this.prisma.nasa.delete({
        where: {
          nasa_id: nasa_id,
        },
      });
      console.log('Registro da NASA apagado com sucesso');
    } catch (error) {
      throw new Error('Erro ao apagar o registro da NASA: ' + JSON.stringify(error));
    }
  }
}
