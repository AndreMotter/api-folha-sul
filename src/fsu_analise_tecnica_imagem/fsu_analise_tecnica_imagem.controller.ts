import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FsuAnaliseTecnicaImagemService } from './fsu_analise_tecnica_imagem.service';

@Controller('fsu-analise-tecnica-imagem')
export class FsuAnaliseTecnicaImagemController {
  constructor(private readonly fsuAnaliseTecnicaImagemService: FsuAnaliseTecnicaImagemService) {}

  @Get('ListarTodos')
  ListarTodos() {
    return this.fsuAnaliseTecnicaImagemService.ListarTodos();
  }

  @Get('BuscarPorId/:ati_codigo')
  BuscarPorId(@Param('ati_codigo') ati_codigo: string) {
    return this.fsuAnaliseTecnicaImagemService.BuscarPorId(+ati_codigo);
  }

  @Get('BuscarPorAnalise/:ant_codigo')
  BuscarPorAnalise(@Param('ant_codigo') ant_codigo: string) {
    return this.fsuAnaliseTecnicaImagemService.BuscarPorAnalise(+ant_codigo);
  }

  @Post('Salvar')
  Salvar(@Body() data: any) {
    return this.fsuAnaliseTecnicaImagemService.Salvar(data);
  }

  @Patch('Alterar/:ati_codigo')
  Alterar(@Param('ati_codigo') ati_codigo: string, @Body() data: any) {
    return this.fsuAnaliseTecnicaImagemService.Alterar(+ati_codigo, data);
  }

  @Delete('Excluir/:ati_codigo')
  Excluir(@Param('ati_codigo') ati_codigo: string) {
    return this.fsuAnaliseTecnicaImagemService.Excluir(+ati_codigo);
  }
}
