import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { z } from 'zod';

export const fsuPropriedadeSchema = z.object({
  pro_descricao: z.string(),
  pro_endereco: z.string().optional().nullable(),
});

@Injectable()
export class FsuPropriedadeService {
  constructor(private prisma: PrismaService) {}

  async ListarTodos() {
    return await this.prisma.fsu_propriedade.findMany();
  }

  async BuscarPorId(pro_codigo: number) {
    return await this.prisma.fsu_propriedade.findUnique({
      where: { pro_codigo },
    });
  }

  async Salvar(data: any) {
    const validatedData = fsuPropriedadeSchema.parse(data);
    return await this.prisma.fsu_propriedade.create({ data: validatedData });
  }

  async Alterar(pro_codigo: number, data: any) {
    const validatedData = fsuPropriedadeSchema.parse(data);
    return await this.prisma.fsu_propriedade.update({
      where: { pro_codigo },
      data: validatedData,
    });
  }

  async Excluir(pro_codigo: number) {
    await this.prisma.fsu_propriedade.delete({
      where: { pro_codigo },
    });
  }
}
