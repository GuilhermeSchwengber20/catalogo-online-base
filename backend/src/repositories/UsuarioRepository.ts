import { db } from '../database/connection';
import { usuarios } from '../database/schema';
import { IUsuarioRepository } from './IUsuarioRepository';
import { eq } from 'drizzle-orm';

export class UsuarioRepository implements IUsuarioRepository {
  async findByEmail(email: string) {
    const result = await db.select().from(usuarios).where(eq(usuarios.email, email));
    return result[0] || null;
  }

  async findById(id: string) {
    const result = await db.select().from(usuarios).where(eq(usuarios.id, id));
    return result[0] || null;
  }
}
