import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { z } from 'zod';

export const fsuTalhaoSchema = z.object({
  pro_codigo: z.number().int(),
  tal_descricao: z.string(),
  tal_area_hectares: z.coerce.number(),
  tal_latitude: z.number().optional().nullable(),
  tal_longitude: z.number().optional().nullable(),
});

@Injectable()
export class FsuTalhaoService {
  constructor(private prisma: PrismaService) {}

  async ListarTodos() {
    return await this.prisma.fsu_talhao.findMany({
      include: { propriedade: true },
    });
  }

  async BuscarPorId(tal_codigo: number) {
    return await this.prisma.fsu_talhao.findUnique({
      where: { tal_codigo },
      include: { propriedade: true },
    });
  }

  async Salvar(data: any) {
    const validatedData = fsuTalhaoSchema.parse(data);
    return await this.prisma.fsu_talhao.create({ data: validatedData });
  }

  async Alterar(tal_codigo: number, data: any) {
    const validatedData = fsuTalhaoSchema.parse(data);
    return await this.prisma.fsu_talhao.update({
      where: { tal_codigo },
      data: validatedData,
    });
  }

  async Excluir(tal_codigo: number) {
    await this.prisma.fsu_talhao.delete({
      where: { tal_codigo },
    });
  }
}
