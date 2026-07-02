import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FsuParcelaService } from './fsu_parcela.service';

@Controller('fsu-parcela')
export class FsuParcelaController {
  constructor(private readonly fsuParcelaService: FsuParcelaService) {}

  @Get('ListarTodos')
  ListarTodos() {
    return this.fsuParcelaService.ListarTodos();
  }

  @Get('BuscarPorId/:par_codigo')
  BuscarPorId(@Param('par_codigo') par_codigo: string) {
    return this.fsuParcelaService.BuscarPorId(+par_codigo);
  }

  @Get('BuscarPorTalhao/:tal_codigo')
  BuscarPorTalhao(@Param('tal_codigo') tal_codigo: string) {
    return this.fsuParcelaService.BuscarPorTalhao(+tal_codigo);
  }

  @Post('Salvar')
  Salvar(@Body() data: any) {
    return this.fsuParcelaService.Salvar(data);
  }

  @Patch('Alterar/:par_codigo')
  Alterar(@Param('par_codigo') par_codigo: string, @Body() data: any) {
    return this.fsuParcelaService.Alterar(+par_codigo, data);
  }

  @Delete('Excluir/:par_codigo')
  Excluir(@Param('par_codigo') par_codigo: string) {
    return this.fsuParcelaService.Excluir(+par_codigo);
  }
}
