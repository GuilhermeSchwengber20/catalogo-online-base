import { z } from 'zod'

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email é obrigatório')
    .email('Email inválido'),
  senha: z
    .string()
    .min(1, 'Senha é obrigatória')
})

export type LoginData = z.infer<typeof LoginSchema>
