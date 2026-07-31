import { z } from 'zod'

export const ProductSchema = z.object({
  nome: z
    .string()
    .min(1, 'Nome é obrigatório')
    .max(150, 'Máximo 150 caracteres'),
  categoriaId: z
    .string()
    .min(1, 'Categoria é obrigatória'),
  descricao: z
    .string()
    .optional()
    .or(z.literal('')),
  preco: z
    .number()
    .positive('Deve ser positivo'),
  precoPromocional: z
    .number()
    .optional()
    .nullable(),
  cor: z
    .string()
    .optional()
    .or(z.literal('')),
  tamanho: z
    .string()
    .optional()
    .or(z.literal('')),
  estoque: z
    .number()
    .min(0, 'Estoque não pode ser negativo')
    .optional()
    .default(0)
})

export const ImageProductSchema = z.object({
  url: z.string(),
  publicId: z.string(),
  ordem: z.number()
})

export type ImageProductSchema = z.infer<typeof ImageProductSchema>
export type ProductFormData = z.infer<typeof ProductSchema>
