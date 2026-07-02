import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { z } from 'zod';

export const fsuParcelaSchema = z.object({
  tal_codigo: z.coerce.number().int(),
  par_descricao: z.string(),
  par_area_hectares: z.coerce.number(),
});

@Injectable()
export class FsuParcelaService {
  constructor(private prisma: PrismaService) {}

  async ListarTodos() {
    return await this.prisma.fsu_parcela.findMany({
      include: { talhao: true },
    });
  }

  async BuscarPorId(par_codigo: number) {
    return await this.prisma.fsu_parcela.findUnique({
      where: { par_codigo },
      include: { talhao: true },
    });
  }

  async BuscarPorTalhao(tal_codigo: number) {
    return await this.prisma.fsu_parcela.findMany({
      where: { tal_codigo },
    });
  }

  async Salvar(data: any) {
    const validatedData = fsuParcelaSchema.parse(data);
    return await this.prisma.fsu_parcela.create({ data: validatedData });
  }

  async Alterar(par_codigo: number, data: any) {
    const validatedData = fsuParcelaSchema.parse(data);
    return await this.prisma.fsu_parcela.update({
      where: { par_codigo },
      data: validatedData,
    });
  }

  async Excluir(par_codigo: number) {
    await this.prisma.fsu_parcela.delete({
      where: { par_codigo },
    });
  }
}
