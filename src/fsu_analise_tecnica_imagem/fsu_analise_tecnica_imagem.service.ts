import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { z } from 'zod';

export const fsuAnaliseTecnicaImagemSchema = z.object({
  ant_codigo: z.coerce.number().int(),
  ati_nome_arquivo: z.string().optional().nullable(),
  ati_imagem: z.string(), // Aceita imagem como string Base64 do cliente
  ati_tipo_arquivo: z.string().optional().nullable(),
  ati_percentual_severidade: z.coerce.number().optional().nullable(),
});

@Injectable()
export class FsuAnaliseTecnicaImagemService {
  constructor(private prisma: PrismaService) {}

  private formatOutput(record: any) {
    if (record && record.ati_imagem && Buffer.isBuffer(record.ati_imagem)) {
      record.ati_imagem = record.ati_imagem.toString('base64');
    }
    return record;
  }

  async ListarTodos() {
    const records = await this.prisma.fsu_analise_tecnica_imagem.findMany();
    return records.map((record) => this.formatOutput(record));
  }

  async BuscarPorId(ati_codigo: number) {
    const record = await this.prisma.fsu_analise_tecnica_imagem.findUnique({
      where: { ati_codigo },
    });
    return this.formatOutput(record);
  }

  async BuscarPorAnalise(ant_codigo: number) {
    const records = await this.prisma.fsu_analise_tecnica_imagem.findMany({
      where: { ant_codigo },
    });
    return records.map((record) => this.formatOutput(record));
  }

  async Salvar(data: any) {
    const validatedData = fsuAnaliseTecnicaImagemSchema.parse(data);
    const buffer = Buffer.from(validatedData.ati_imagem, 'base64');
    const record = await this.prisma.fsu_analise_tecnica_imagem.create({
      data: {
        ...validatedData,
        ati_imagem: buffer,
      },
    });
    return this.formatOutput(record);
  }

  async Alterar(ati_codigo: number, data: any) {
    const validatedData = fsuAnaliseTecnicaImagemSchema.parse(data);
    const buffer = Buffer.from(validatedData.ati_imagem, 'base64');
    const record = await this.prisma.fsu_analise_tecnica_imagem.update({
      where: { ati_codigo },
      data: {
        ...validatedData,
        ati_imagem: buffer,
      },
    });
    return this.formatOutput(record);
  }

  async Excluir(ati_codigo: number) {
    await this.prisma.fsu_analise_tecnica_imagem.delete({
      where: { ati_codigo },
    });
  }
}
