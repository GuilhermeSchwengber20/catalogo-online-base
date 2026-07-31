import { z } from 'zod';

export const createCategoriaSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório').max(100),
  descricao: z.string().nullable().optional(),
  imagem: z.string().nullable().optional(),
  ordem: z.number().int().default(0),
});

export const updateCategoriaSchema = z.object({
  nome: z.string().min(1).max(100).optional(),
  slug: z.string().min(1).max(120).optional(),
  descricao: z.string().nullable().optional(),
  imagem: z.string().nullable().optional(),
  ordem: z.number().int().optional(),
});
