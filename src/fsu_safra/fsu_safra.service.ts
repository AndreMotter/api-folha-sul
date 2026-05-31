import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { z } from 'zod';

export const fsuSafraSchema = z.object({
  saf_descricao: z.string(),
  saf_data_inicio: z.coerce.date(),
  saf_data_fim: z.coerce.date().optional().nullable(),
  saf_status: z.coerce.number().int(),
});

@Injectable()
export class FsuSafraService {
  constructor(private prisma: PrismaService) {}

  async ListarTodos() {
    return await this.prisma.fsu_safra.findMany();
  }

  async BuscarPorId(saf_codigo: number) {
    return await this.prisma.fsu_safra.findUnique({
      where: { saf_codigo },
    });
  }

  async Salvar(data: any) {
    const validatedData = fsuSafraSchema.parse(data);
    return await this.prisma.fsu_safra.create({ data: validatedData });
  }

  async Alterar(saf_codigo: number, data: any) {
    const validatedData = fsuSafraSchema.parse(data);
    return await this.prisma.fsu_safra.update({
      where: { saf_codigo },
      data: validatedData,
    });
  }

  async Excluir(saf_codigo: number) {
    await this.prisma.fsu_safra.delete({
      where: { saf_codigo },
    });
  }
}
