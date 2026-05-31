import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FsuPropriedadeService } from './fsu_propriedade.service';

@Controller('fsu-propriedade')
export class FsuPropriedadeController {
  constructor(private readonly fsuPropriedadeService: FsuPropriedadeService) {}

  @Get('ListarTodos')
  ListarTodos() {
    return this.fsuPropriedadeService.ListarTodos();
  }

  @Get('BuscarPorId/:pro_codigo')
  BuscarPorId(@Param('pro_codigo') pro_codigo: string) {
    return this.fsuPropriedadeService.BuscarPorId(+pro_codigo);
  }

  @Post('Salvar')
  Salvar(@Body() data: any) {
    return this.fsuPropriedadeService.Salvar(data);
  }

  @Patch('Alterar/:pro_codigo')
  Alterar(@Param('pro_codigo') pro_codigo: string, @Body() data: any) {
    return this.fsuPropriedadeService.Alterar(+pro_codigo, data);
  }

  @Delete('Excluir/:pro_codigo')
  Excluir(@Param('pro_codigo') pro_codigo: string) {
    return this.fsuPropriedadeService.Excluir(+pro_codigo);
  }
}
