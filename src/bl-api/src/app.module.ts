import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NasaModule } from './nasa/nasa.module';

@Module({
  imports: [NasaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
