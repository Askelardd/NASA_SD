import { Module } from '@nestjs/common';
import { NasaController } from './nasa.controller';
import { NasaService } from './nasa.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [NasaService, PrismaService],
  controllers: [NasaController]
})
export class NasaModule {}
