import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { NasaService } from './nasa.service';
import { NasaInsert } from '../models/nasa.model';

@Controller('nasa')
export class NasaController {
  constructor(private readonly nasaService: NasaService) {}

  @Get()
  async findAll() {
    return await this.nasaService.findMany();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.nasaService.findUnique(+id);
  }

  @Post()
  async create(@Body() data: NasaInsert) {
    return await this.nasaService.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() data: NasaInsert) {
    return await this.nasaService.update(+id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.nasaService.remove(+id);
  }
}
