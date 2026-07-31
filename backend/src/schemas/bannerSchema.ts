import { z } from 'zod';

export const createBannerSchema = z.object({
  titulo: z.string().max(120).nullable().optional(),
  subtitulo: z.string().max(255).nullable().optional(),
  imagem: z.string().min(1, 'Imagem é obrigatória').max(255),
  link: z.string().nullable().optional(),
  ordem: z.number().int().default(0),
});

export const updateBannerSchema = z.object({
  titulo: z.string().max(120).nullable().optional(),
  subtitulo: z.string().max(255).nullable().optional(),
  imagem: z.string().min(1).max(255).optional(),
  link: z.string().nullable().optional(),
  ordem: z.number().int().optional(),
});
