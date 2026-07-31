import { itensPedido } from '../database/schema';

export interface IItemPedidoRepository {
  findByPedidoId(pedidoId: string): Promise<typeof itensPedido.$inferSelect[]>;
  create(data: typeof itensPedido.$inferInsert): Promise<typeof itensPedido.$inferSelect>;
  createMany(data: typeof itensPedido.$inferInsert[]): Promise<typeof itensPedido.$inferSelect[]>;
}
