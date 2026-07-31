import { z } from 'zod';

export const updateConfiguracaoSchema = z.object({
  nomeLoja: z.string().max(120).nullable().optional(),
  logo: z.string().max(255).nullable().optional(),
  telefoneWhatsapp: z.string().max(20).nullable().optional(),
  email: z.string().max(120).nullable().optional(),
  instagram: z.string().max(255).nullable().optional(),
  facebook: z.string().max(255).nullable().optional(),
  corPrimaria: z.string().max(20).nullable().optional(),
  corSecundaria: z.string().max(20).nullable().optional(),
  textoHome: z.string().nullable().optional(),
  mostrarPrecos: z.boolean().optional(),
});
