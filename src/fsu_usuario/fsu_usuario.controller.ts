import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FsuUsuarioService } from './fsu_usuario.service';

@Controller('fsu-usuario')
export class FsuUsuarioController {
  constructor(private readonly fsuUsuarioService: FsuUsuarioService) {}

  @Get('TesteApi')
  TesteApi() {
    return {
      message: 'API Folha Sul funcionando',
    };
  }

  @Post('Login')
  Login(@Body() data: any) {
    return this.fsuUsuarioService.Login(data.login, data.senha);
  }

  @Get('ListarTodos')
  ListarTodos() {
    return this.fsuUsuarioService.ListarTodos();
  }

  @Get('BuscarPorId/:usu_codigo')
  BuscarPorId(@Param('usu_codigo') usu_codigo: string) {
    return this.fsuUsuarioService.BuscarPorId(+usu_codigo);
  }

  @Post('Salvar')
  Salvar(@Body() data: any) {
    return this.fsuUsuarioService.Salvar(data);
  }

  @Patch('Alterar/:usu_codigo')
  Alterar(@Param('usu_codigo') usu_codigo: string, @Body() data: any) {
    return this.fsuUsuarioService.Alterar(+usu_codigo, data);
  }

  @Delete('Excluir/:usu_codigo')
  Excluir(@Param('usu_codigo') usu_codigo: string) {
    return this.fsuUsuarioService.Excluir(+usu_codigo);
  }
}
