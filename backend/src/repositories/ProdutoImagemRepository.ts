import { CloudinaryService } from '@/services/upload/CloudinaryService';
import { db } from '../database/connection';
import { produtoImagens } from '../database/schema';
import { IProdutoImagemRepository } from './IProdutoImagemRepository';
import { eq } from 'drizzle-orm';

export class ProdutoImagemRepository implements IProdutoImagemRepository {

  constructor (
    private readonly cloudinaryService: CloudinaryService
  ) {}
  async findByProdutoId(produtoId: string) {
    return db.select().from(produtoImagens).where(eq(produtoImagens.produtoId, produtoId)).orderBy(produtoImagens.ordem);
  }

  async create(data: typeof produtoImagens.$inferInsert) {
    const result = await db.insert(produtoImagens).values(data).returning();
    return result[0];
  }

  async delete(id: string) {
    await db.delete(produtoImagens).where(eq(produtoImagens.id, id));
  }

  async sync(produtoId: string, imagens: Array<Pick<typeof produtoImagens.$inferInsert, 'url' | 'publicId' | 'ordem'>>): Promise<void> {
    const imagensAtuais = await this.findByProdutoId(produtoId)

      const imagensRemover = imagensAtuais.filter(
        atual =>
          !imagens!.some(nova => nova.publicId === atual.publicId)
      );

      const imagensAdicionar = imagens.filter(
        nova =>
          !imagensAtuais.some(atual => atual.publicId === nova.publicId)
      );

      for (const imagem of imagensRemover) {
        await db.transaction(async (tx) => {
          await this.cloudinaryService.remove(imagem.publicId as string);
          await this.delete(imagem.id);
        })
      }

      for (const imagem of imagensAdicionar) {
        await this.create({
          produtoId: produtoId,
          url: imagem.url,
          publicId: imagem.publicId,
          ordem: imagem.ordem ?? 0,
        });
      }
  }
}
