import { Module } from '@nestjs/common';
import { FsuPropriedadeService } from './fsu_propriedade.service';
import { FsuPropriedadeController } from './fsu_propriedade.controller';

@Module({
  controllers: [FsuPropriedadeController],
  providers: [FsuPropriedadeService],
  exports: [FsuPropriedadeService],
})
export class FsuPropriedadeModule {}
