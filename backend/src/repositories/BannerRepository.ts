import { db } from '../database/connection';
import { banners } from '../database/schema';
import { IBannerRepository } from './IBannerRepository';
import { eq } from 'drizzle-orm';

export class BannerRepository implements IBannerRepository {
  async findAll(activeOnly?: boolean) {
    if (activeOnly) {
      return db.select().from(banners).where(eq(banners.ativo, true)).orderBy(banners.ordem);
    }
    return db.select().from(banners).orderBy(banners.ordem);
  }

  async findById(id: string) {
    const result = await db.select().from(banners).where(eq(banners.id, id));
    return result[0] || null;
  }

  async create(data: typeof banners.$inferInsert) {
    const result = await db.insert(banners).values(data).returning();
    return result[0];
  }

  async update(id: string, data: Partial<typeof banners.$inferInsert>) {
    const result = await db.update(banners).set(data).where(eq(banners.id, id)).returning();
    return result[0];
  }
}
