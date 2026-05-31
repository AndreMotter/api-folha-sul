import { Module } from '@nestjs/common';
import { FsuUsuarioService } from './fsu_usuario.service';
import { FsuUsuarioController } from './fsu_usuario.controller';

@Module({
  controllers: [FsuUsuarioController],
  providers: [FsuUsuarioService],
  exports: [FsuUsuarioService],
})
export class FsuUsuarioModule {}
