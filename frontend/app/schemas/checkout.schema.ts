import { z } from 'zod'

export const CheckoutSchema = z.object({
  nome: z
    .string()
    .min(1, 'Nome é obrigatório')
    .max(120, 'Nome deve ter no máximo 120 caracteres'),
  telefone: z
    .string()
    .min(1, 'Telefone é obrigatório')
    .max(20, 'Telefone inválido'),
  email: z
    .string()
    .email('Email inválido')
    .optional()
    .or(z.literal('')),
  cidade: z
    .string()
    .optional()
    .or(z.literal('')),
  observacao: z
    .string()
    .optional()
    .or(z.literal(''))
})

export type CheckoutData = z.infer<typeof CheckoutSchema>
