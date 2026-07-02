import { Module } from '@nestjs/common';
import { FsuParcelaService } from './fsu_parcela.service';
import { FsuParcelaController } from './fsu_parcela.controller';

@Module({
  controllers: [FsuParcelaController],
  providers: [FsuParcelaService],
  exports: [FsuParcelaService],
})
export class FsuParcelaModule {}
