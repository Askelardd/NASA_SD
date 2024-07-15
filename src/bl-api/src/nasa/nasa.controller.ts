import { Controller, Get, Post, Body } from '@nestjs/common';
import { NasaService } from './nasa.service';

@Controller('nasa')
export class NasaController {
    constructor(private readonly nasaService: NasaService) {}

    @Get()
    async findAll() {
        return this.nasaService.findAll();
    }

}
