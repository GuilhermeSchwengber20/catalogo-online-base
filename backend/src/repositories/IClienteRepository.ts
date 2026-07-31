import { clientes } from '../database/schema';

export interface IClienteRepository {
  findAll(): Promise<typeof clientes.$inferSelect[]>;
  findById(id: string): Promise<typeof clientes.$inferSelect | null>;
  findByTelefone(telefone: string): Promise<typeof clientes.$inferSelect | null>;
  create(data: typeof clientes.$inferInsert): Promise<typeof clientes.$inferSelect>;
  update(id: string, data: Partial<typeof clientes.$inferInsert>): Promise<typeof clientes.$inferSelect>;
}
