import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { TeachersModule } from './teachers/teachers.module';
import { NasaService } from './nasa/nasa.service';
import { NasaModule } from './nasa/nasa.module';

@Module({
  imports: [NasaModule],
  controllers: [AppController],
  providers: [AppService, NasaService],
})
export class AppModule {}
