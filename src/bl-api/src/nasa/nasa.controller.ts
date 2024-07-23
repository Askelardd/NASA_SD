import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { NasaService } from './nasa.service';
import { NasaInsert } from '../models/nasa.model';

@Controller('nasa')
export class NasaController {
  constructor(private readonly nasaService: NasaService) {}

  @Get()
  async findAll() {
    try {
      return await this.nasaService.findMany();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    try {
      return await this.nasaService.findUnique(+id);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  @Post()
  async create(@Body() data: NasaInsert) {
    try {
      return await this.nasaService.create(data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() data: NasaInsert) {
    try {
      return await this.nasaService.update(+id, data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    try {
      await this.nasaService.remove(+id);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
