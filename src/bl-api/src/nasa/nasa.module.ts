import { Module } from '@nestjs/common';
import { NasaService } from './nasa.service';
import { NasaController } from './nasa.controller';
import { PrismaService } from '../prisma.service';

@Module({
  imports: [],
  controllers: [NasaController],
  providers: [NasaService, PrismaService],
})
export class NasaModule {}
