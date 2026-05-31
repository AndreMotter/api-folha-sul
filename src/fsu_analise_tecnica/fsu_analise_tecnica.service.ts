import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { z } from 'zod';

export const fsuAnaliseTecnicaSchema = z.object({
  tal_codigo: z.coerce.number().int(),
  saf_codigo: z.coerce.number().int(),
  usu_codigo: z.coerce.number().int(),
  ant_observacao: z.string().optional().nullable(),
  ant_data_hora: z.coerce.date(),
  ant_status: z.coerce.number().int(),
});

@Injectable()
export class FsuAnaliseTecnicaService {
  constructor(private prisma: PrismaService) {}

  async ListarTodos() {
    return await this.prisma.fsu_analise_tecnica.findMany({
      include: {
        talhao: true,
        safra: true,
        usuario: true,
        imagens: true,
      },
    });
  }

  async BuscarPorId(ant_codigo: number) {
    return await this.prisma.fsu_analise_tecnica.findUnique({
      where: { ant_codigo },
      include: {
        talhao: true,
        safra: true,
        usuario: true,
        imagens: true,
      },
    });
  }

  async Salvar(data: any) {
    const validatedData = fsuAnaliseTecnicaSchema.parse(data);
    return await this.prisma.fsu_analise_tecnica.create({ data: validatedData });
  }

  async Alterar(ant_codigo: number, data: any) {
    const validatedData = fsuAnaliseTecnicaSchema.parse(data);
    return await this.prisma.fsu_analise_tecnica.update({
      where: { ant_codigo },
      data: validatedData,
    });
  }

  async Excluir(ant_codigo: number) {
    await this.prisma.fsu_analise_tecnica.delete({
      where: { ant_codigo },
    });
  }
}
