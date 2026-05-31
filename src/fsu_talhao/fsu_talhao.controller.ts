import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FsuTalhaoService } from './fsu_talhao.service';

@Controller('fsu-talhao')
export class FsuTalhaoController {
  constructor(private readonly fsuTalhaoService: FsuTalhaoService) {}

  @Get('ListarTodos')
  ListarTodos() {
    return this.fsuTalhaoService.ListarTodos();
  }

  @Get('BuscarPorId/:tal_codigo')
  BuscarPorId(@Param('tal_codigo') tal_codigo: string) {
    return this.fsuTalhaoService.BuscarPorId(+tal_codigo);
  }

  @Post('Salvar')
  Salvar(@Body() data: any) {
    return this.fsuTalhaoService.Salvar(data);
  }

  @Patch('Alterar/:tal_codigo')
  Alterar(@Param('tal_codigo') tal_codigo: string, @Body() data: any) {
    return this.fsuTalhaoService.Alterar(+tal_codigo, data);
  }

  @Delete('Excluir/:tal_codigo')
  Excluir(@Param('tal_codigo') tal_codigo: string) {
    return this.fsuTalhaoService.Excluir(+tal_codigo);
  }
}
