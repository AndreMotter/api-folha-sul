import { Module } from '@nestjs/common';
import { FsuAnaliseTecnicaImagemService } from './fsu_analise_tecnica_imagem.service';
import { FsuAnaliseTecnicaImagemController } from './fsu_analise_tecnica_imagem.controller';

@Module({
  controllers: [FsuAnaliseTecnicaImagemController],
  providers: [FsuAnaliseTecnicaImagemService],
  exports: [FsuAnaliseTecnicaImagemService],
})
export class FsuAnaliseTecnicaImagemModule {}
