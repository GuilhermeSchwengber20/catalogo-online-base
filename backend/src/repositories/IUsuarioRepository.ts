import { usuarios } from '../database/schema';

export interface IUsuarioRepository {
  findByEmail(email: string): Promise<typeof usuarios.$inferSelect | null>;
  findById(id: string): Promise<typeof usuarios.$inferSelect | null>;
}
