import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { z } from 'zod';

export const fsuAnaliseTecnicaSchema = z.object({
  par_codigo: z.coerce.number().int(),
  saf_codigo: z.coerce.number().int(),
  usu_codigo: z.coerce.number().int(),
  ant_observacao: z.string().optional().nullable(),
  ant_data_hora: z.coerce.date(),
  ant_status: z.coerce.number().int(),
  imagens: z.array(
    z.object({
      ati_imagem: z.string(), 
      ati_nome_arquivo: z.string().optional().nullable(),
      ati_tipo_arquivo: z.string().optional().nullable(),
      ati_percentual_severidade: z.coerce.number().optional().nullable(),
    })
  ).optional().nullable(),
});

@Injectable()
export class FsuAnaliseTecnicaService {
  constructor(private prisma: PrismaService) {}

  private formatOutput(record: any) {
    if (!record) return record;
    if (record.imagens && Array.isArray(record.imagens)) {
      record.imagens = record.imagens.map((img: any) => {
        if (img.ati_imagem && Buffer.isBuffer(img.ati_imagem)) {
          img.ati_imagem = img.ati_imagem.toString('base64');
        }
        return img;
      });
    }
    return record;
  }

  async ListarTodos() {
    const records = await this.prisma.fsu_analise_tecnica.findMany({
      include: {
        parcela: { include: { talhao: true } },
        safra: true,
        usuario: true,
        imagens: true,
      },
    });
    return records.map((record) => this.formatOutput(record));
  }

  async BuscarPorId(ant_codigo: number) {
    const record = await this.prisma.fsu_analise_tecnica.findUnique({
      where: { ant_codigo },
      include: {
        parcela: { include: { talhao: true } },
        safra: true,
        usuario: true,
        imagens: true,
      },
    });
    return this.formatOutput(record);
  }

  async Salvar(data: any) {
    const validatedData = fsuAnaliseTecnicaSchema.parse(data);
    const { imagens, ...rest } = validatedData;

    const record = await this.prisma.fsu_analise_tecnica.create({
      data: {
        ...rest,
        imagens: imagens && imagens.length > 0 ? {
          create: imagens.map((img) => ({
            ati_imagem: Buffer.from(img.ati_imagem, 'base64'),
            ati_nome_arquivo: img.ati_nome_arquivo || null,
            ati_tipo_arquivo: img.ati_tipo_arquivo || null,
            ati_percentual_severidade: img.ati_percentual_severidade || null,
          }))
        } : undefined,
      },
      include: {
        imagens: true,
      }
    });

    return this.formatOutput(record);
  }

  async Alterar(ant_codigo: number, data: any) {
    const validatedData = fsuAnaliseTecnicaSchema.parse(data);
    const { imagens, ...rest } = validatedData;

    const record = await this.prisma.fsu_analise_tecnica.update({
      where: { ant_codigo },
      data: {
        ...rest,
        // Optional: update or append new images if provided
        imagens: imagens && imagens.length > 0 ? {
          deleteMany: {}, // replace existing images
          create: imagens.map((img) => ({
            ati_imagem: Buffer.from(img.ati_imagem, 'base64'),
            ati_nome_arquivo: img.ati_nome_arquivo || null,
            ati_tipo_arquivo: img.ati_tipo_arquivo || null,
            ati_percentual_severidade: img.ati_percentual_severidade || null,
          }))
        } : undefined,
      },
      include: {
        imagens: true,
      }
    });

    return this.formatOutput(record);
  }

  async Excluir(ant_codigo: number) {
    await this.prisma.fsu_analise_tecnica.delete({
      where: { ant_codigo },
    });
  }
}
