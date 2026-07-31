import { z } from 'zod';

export const updateClienteSchema = z.object({
  nome: z.string().min(1).max(120).optional(),
  telefone: z.string().min(1).max(20).optional(),
  email: z.string().max(120).nullable().optional(),
  cidade: z.string().max(120).nullable().optional(),
});
