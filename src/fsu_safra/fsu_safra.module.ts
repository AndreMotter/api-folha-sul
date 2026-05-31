import { Module } from '@nestjs/common';
import { FsuSafraService } from './fsu_safra.service';
import { FsuSafraController } from './fsu_safra.controller';

@Module({
  controllers: [FsuSafraController],
  providers: [FsuSafraService],
  exports: [FsuSafraService],
})
export class FsuSafraModule {}
