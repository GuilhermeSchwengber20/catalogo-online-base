import { z } from 'zod';

const itemSchema = z.object({
  produtoId: z.string().uuid(),
  quantidade: z.number().int().min(1, 'Quantidade deve ser no mínimo 1'),
});

export const createPedidoManualSchema = z.object({
  clienteId: z.string().uuid().optional(),
  cliente: z.object({
    nome: z.string().min(1, 'Nome é obrigatório').max(120),
    telefone: z.string().min(1, 'Telefone é obrigatório').max(20),
    email: z.string().max(120).nullable().optional(),
    cidade: z.string().max(120).nullable().optional(),
  }).optional(),
  itens: z.array(itemSchema).min(1, 'Pedido deve ter pelo menos um item'),
  observacaoInterna: z.string().nullable().optional(),
});

export const createPedidoCatalogSchema = z.object({
  cliente: z.object({
    nome: z.string().min(1, 'Nome é obrigatório').max(120),
    telefone: z.string().min(1, 'Telefone é obrigatório').max(20),
    email: z.string().max(120).nullable().optional(),
    cidade: z.string().max(120).nullable().optional(),
  }),
  itens: z.array(itemSchema).min(1, 'Pedido deve ter pelo menos um item'),
  observacaoCliente: z.string().nullable().optional(),
});

export const updatePedidoStatusSchema = z.object({
  status: z.enum(['ABERTO', 'EM_COMPRA', 'AGUARDANDO_CLIENTE', 'CONCLUIDO', 'CANCELADO']),
});
