import { Module } from '@nestjs/common';
import { FsuTalhaoService } from './fsu_talhao.service';
import { FsuTalhaoController } from './fsu_talhao.controller';

@Module({
  controllers: [FsuTalhaoController],
  providers: [FsuTalhaoService],
  exports: [FsuTalhaoService],
})
export class FsuTalhaoModule {}
