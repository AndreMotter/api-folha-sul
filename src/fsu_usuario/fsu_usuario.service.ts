import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { z } from 'zod';
import { JwtService } from '@nestjs/jwt';

export const fsuUsuarioSchema = z.object({
  usu_login: z.string(),
  usu_senha: z.string(),
});

@Injectable()
export class FsuUsuarioService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async Login(login: string, senha: string) {
    const usuario = await this.prisma.fsu_usuario.findFirst({
      where: { usu_login: login },
    });

    if (!usuario) {
      throw new UnauthorizedException('Usuário ou senha inválidos');
    }

    if (usuario.usu_senha !== senha) {
      throw new UnauthorizedException('Usuário ou senha inválidos');
    }

    const payload = { usu_codigo: usuario.usu_codigo, login: usuario.usu_login };
    const token = await this.jwt.signAsync(payload);

    return {
      access_token: token,
      usuario: usuario.usu_login,
      usu_codigo: usuario.usu_codigo,
    };
  }

  async ListarTodos() {
    return await this.prisma.fsu_usuario.findMany();
  }

  async BuscarPorId(usu_codigo: number) {
    return await this.prisma.fsu_usuario.findUnique({
      where: { usu_codigo },
    });
  }

  async Salvar(data: any) {
    const validatedData = fsuUsuarioSchema.parse(data);
    return await this.prisma.fsu_usuario.create({ data: validatedData });
  }

  async Alterar(usu_codigo: number, data: any) {
    const validatedData = fsuUsuarioSchema.parse(data);
    return await this.prisma.fsu_usuario.update({
      where: { usu_codigo },
      data: validatedData,
    });
  }

  async Excluir(usu_codigo: number) {
    await this.prisma.fsu_usuario.delete({
      where: { usu_codigo },
    });
  }
}
