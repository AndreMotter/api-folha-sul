import { Module } from '@nestjs/common';
import { FsuAnaliseTecnicaService } from './fsu_analise_tecnica.service';
import { FsuAnaliseTecnicaController } from './fsu_analise_tecnica.controller';

@Module({
  controllers: [FsuAnaliseTecnicaController],
  providers: [FsuAnaliseTecnicaService],
  exports: [FsuAnaliseTecnicaService],
})
export class FsuAnaliseTecnicaModule {}
