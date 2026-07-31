import { db } from '../database/connection';
import { clientes } from '../database/schema';
import { IClienteRepository } from './IClienteRepository';
import { eq } from 'drizzle-orm';

export class ClienteRepository implements IClienteRepository {
  async findAll() {
    return db.select().from(clientes);
  }

  async findById(id: string) {
    const result = await db.select().from(clientes).where(eq(clientes.id, id));
    return result[0] || null;
  }

  async findByTelefone(telefone: string) {
    const result = await db.select().from(clientes).where(eq(clientes.telefone, telefone));
    return result[0] || null;
  }

  async create(data: typeof clientes.$inferInsert) {
    const result = await db.insert(clientes).values(data).returning();
    return result[0];
  }

  async update(id: string, data: Partial<typeof clientes.$inferInsert>) {
    const result = await db.update(clientes).set(data).where(eq(clientes.id, id)).returning();
    return result[0];
  }
}
