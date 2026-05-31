import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FsuSafraService } from './fsu_safra.service';

@Controller('fsu-safra')
export class FsuSafraController {
  constructor(private readonly fsuSafraService: FsuSafraService) {}

  @Get('ListarTodos')
  ListarTodos() {
    return this.fsuSafraService.ListarTodos();
  }

  @Get('BuscarPorId/:saf_codigo')
  BuscarPorId(@Param('saf_codigo') saf_codigo: string) {
    return this.fsuSafraService.BuscarPorId(+saf_codigo);
  }

  @Post('Salvar')
  Salvar(@Body() data: any) {
    return this.fsuSafraService.Salvar(data);
  }

  @Patch('Alterar/:saf_codigo')
  Alterar(@Param('saf_codigo') saf_codigo: string, @Body() data: any) {
    return this.fsuSafraService.Alterar(+saf_codigo, data);
  }

  @Delete('Excluir/:saf_codigo')
  Excluir(@Param('saf_codigo') saf_codigo: string) {
    return this.fsuSafraService.Excluir(+saf_codigo);
  }
}
