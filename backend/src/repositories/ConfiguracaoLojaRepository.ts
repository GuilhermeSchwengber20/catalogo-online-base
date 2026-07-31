import { db } from '../database/connection';
import { configuracaoLoja } from '../database/schema';
import { IConfiguracaoLojaRepository } from './IConfiguracaoLojaRepository';
import { eq } from 'drizzle-orm';

export class ConfiguracaoLojaRepository implements IConfiguracaoLojaRepository {
  async find() {
    const result = await db.select().from(configuracaoLoja);
    return result[0] || null;
  }

  async update(data: Partial<typeof configuracaoLoja.$inferInsert>) {
    const existing = await this.find();
    if (existing) {
      const result = await db.update(configuracaoLoja).set(data).where(eq(configuracaoLoja.id, existing.id)).returning();
      return result[0];
    }
    const result = await db.insert(configuracaoLoja).values(data as typeof configuracaoLoja.$inferInsert).returning();
    return result[0];
  }
}
