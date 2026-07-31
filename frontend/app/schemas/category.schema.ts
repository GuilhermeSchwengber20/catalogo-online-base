import { z } from 'zod'

export const CategorySchema = z.object({
  nome: z
    .string()
    .min(1, 'Nome é obrigatório')
    .max(100, 'Nome deve ter no máximo 100 caracteres'),
  descricao: z
    .string()
    .optional()
    .or(z.literal('')),
  ordem: z
    .number()
    .optional()
    .default(0)
})

export type CategoryFormData = z.infer<typeof CategorySchema>
