import { db } from '../database/connection';
import { pedidos } from '../database/schema';
import { IPedidoRepository } from './IPedidoRepository';
import { eq, and } from 'drizzle-orm';

export class PedidoRepository implements IPedidoRepository {
  async findAll(filters?: { status?: string; cliente?: string; cidade?: string; origem?: string }) {
    const conditions = [];

    if (filters?.status) {
      conditions.push(eq(pedidos.status, filters.status));
    }
    if (filters?.cliente) {
      conditions.push(eq(pedidos.clienteId, filters.cliente));
    }
    if (filters?.origem) {
      conditions.push(eq(pedidos.origem, filters.origem));
    }

    const query = db.select().from(pedidos);

    if (conditions.length > 0) {
      query.where(and(...conditions));
    }

    return query.orderBy(pedidos.createdAt);
  }

  async findById(id: string) {
    const result = await db.select().from(pedidos).where(eq(pedidos.id, id));
    return result[0] || null;
  }

  async create(data: typeof pedidos.$inferInsert) {
    const result = await db.insert(pedidos).values(data).returning();
    return result[0];
  }

  async update(id: string, data: Partial<typeof pedidos.$inferInsert>) {
    const result = await db.update(pedidos).set(data).where(eq(pedidos.id, id)).returning();
    return result[0];
  }
}
