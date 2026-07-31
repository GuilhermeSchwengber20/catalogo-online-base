import { pedidos } from '../database/schema';

export interface IPedidoRepository {
  findAll(filters?: { status?: string; cliente?: string; cidade?: string; origem?: string }): Promise<typeof pedidos.$inferSelect[]>;
  findById(id: string): Promise<typeof pedidos.$inferSelect | null>;
  create(data: typeof pedidos.$inferInsert): Promise<typeof pedidos.$inferSelect>;
  update(id: string, data: Partial<typeof pedidos.$inferInsert>): Promise<typeof pedidos.$inferSelect>;
}
