import { categorias } from '../database/schema';

export interface ICategoriaRepository {
  findAll(activeOnly?: boolean): Promise<typeof categorias.$inferSelect[]>;
  findById(id: string): Promise<typeof categorias.$inferSelect | null>;
  findBySlug(slug: string): Promise<typeof categorias.$inferSelect | null>;
  create(data: typeof categorias.$inferInsert): Promise<typeof categorias.$inferSelect>;
  update(id: string, data: Partial<typeof categorias.$inferInsert>): Promise<typeof categorias.$inferSelect>;
}
