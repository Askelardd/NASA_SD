import { Injectable } from '@nestjs/common';
import { NasaDto } from 'src/dtos/nasa.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class NasaService {
    constructor(private readonly prisma: PrismaService) {}

    async findAll(): Promise<NasaDto[]> {
        return this.prisma.nasa.findMany({
            include: {
                geolocation: true,
            },
        });
    }
}