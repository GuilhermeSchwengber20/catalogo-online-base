import { db } from '../database/connection';
import { categorias } from '../database/schema';
import { ICategoriaRepository } from './ICategoriaRepository';
import { eq } from 'drizzle-orm';

export class CategoriaRepository implements ICategoriaRepository {
  async findAll(activeOnly?: boolean) {
    if (activeOnly) {
      return db.select().from(categorias).where(eq(categorias.ativo, true)).orderBy(categorias.ordem);
    }
    return db.select().from(categorias).orderBy(categorias.ordem);
  }

  async findById(id: string) {
    const result = await db.select().from(categorias).where(eq(categorias.id, id));
    return result[0] || null;
  }

  async findBySlug(slug: string) {
    const result = await db.select().from(categorias).where(eq(categorias.slug, slug));
    return result[0] || null;
  }

  async create(data: typeof categorias.$inferInsert) {
    const result = await db.insert(categorias).values(data).returning();
    return result[0];
  }

  async update(id: string, data: Partial<typeof categorias.$inferInsert>) {
    const result = await db.update(categorias).set(data).where(eq(categorias.id, id)).returning();
    return result[0];
  }
}
