import { db } from '../database/connection';
import { itensPedido } from '../database/schema';
import { IItemPedidoRepository } from './IItemPedidoRepository';
import { eq } from 'drizzle-orm';

export class ItemPedidoRepository implements IItemPedidoRepository {
  async findByPedidoId(pedidoId: string) {
    return db.select().from(itensPedido).where(eq(itensPedido.pedidoId, pedidoId));
  }

  async create(data: typeof itensPedido.$inferInsert) {
    const result = await db.insert(itensPedido).values(data).returning();
    return result[0];
  }

  async createMany(data: typeof itensPedido.$inferInsert[]) {
    return db.insert(itensPedido).values(data).returning();
  }
}
