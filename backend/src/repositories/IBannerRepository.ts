import { banners } from '../database/schema';

export interface IBannerRepository {
  findAll(activeOnly?: boolean): Promise<typeof banners.$inferSelect[]>;
  findById(id: string): Promise<typeof banners.$inferSelect | null>;
  create(data: typeof banners.$inferInsert): Promise<typeof banners.$inferSelect>;
  update(id: string, data: Partial<typeof banners.$inferInsert>): Promise<typeof banners.$inferSelect>;
}
