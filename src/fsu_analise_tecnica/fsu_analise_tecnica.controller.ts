import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FsuAnaliseTecnicaService } from './fsu_analise_tecnica.service';

@Controller('fsu-analise-tecnica')
export class FsuAnaliseTecnicaController {
  constructor(private readonly fsuAnaliseTecnicaService: FsuAnaliseTecnicaService) {}

  @Get('ListarTodos')
  ListarTodos() {
    return this.fsuAnaliseTecnicaService.ListarTodos();
  }

  @Get('BuscarPorId/:ant_codigo')
  BuscarPorId(@Param('ant_codigo') ant_codigo: string) {
    return this.fsuAnaliseTecnicaService.BuscarPorId(+ant_codigo);
  }

  @Post('Salvar')
  Salvar(@Body() data: any) {
    return this.fsuAnaliseTecnicaService.Salvar(data);
  }

  @Patch('Alterar/:ant_codigo')
  Alterar(@Param('ant_codigo') ant_codigo: string, @Body() data: any) {
    return this.fsuAnaliseTecnicaService.Alterar(+ant_codigo, data);
  }

  @Delete('Excluir/:ant_codigo')
  Excluir(@Param('ant_codigo') ant_codigo: string) {
    return this.fsuAnaliseTecnicaService.Excluir(+ant_codigo);
  }
}
