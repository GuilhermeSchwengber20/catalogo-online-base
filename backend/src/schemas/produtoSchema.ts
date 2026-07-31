import { z } from 'zod';

export const createProdutoSchema = z.object({
  categoriaId: z.string().uuid('Categoria inválida'),
  nome: z.string().min(1, 'Nome é obrigatório').max(150),
  descricao: z.string().nullable().optional(),
  preco: z.number().positive(),
  precoPromocional:z.number().positive().nullable().optional(),
  cor: z.string().nullable().optional(),
  tamanho: z.string().nullable().optional(),
  estoque: z.number().int().min(0).default(0),
  imagens: z.array(z.object({
    url: z.string().min(1),
    ordem: z.number().int().optional(),
    publicId: z.string()
  })).optional(),
});

export const updateProdutoSchema = z.object({
  categoriaId: z.string().uuid().optional(),
  nome: z.string().min(1).max(150).optional(),
  slug: z.string().min(1).max(150).optional(),
  descricao: z.string().nullable().optional(),
  preco: z.number().positive(),
  precoPromocional: z.number().positive().nullable().optional(),
  cor: z.string().nullable().optional(),
  tamanho: z.string().nullable().optional(),
  estoque: z.number().int().min(0).optional(),
  imagens: z.array(z.object({
    url: z.string().min(1),
    ordem: z.number().int().optional(),
    publicId: z.string()

  })).optional(),
});
