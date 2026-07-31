import { produtoImagens } from '../database/schema';

export interface IProdutoImagemRepository {
  findByProdutoId(produtoId: string): Promise<typeof produtoImagens.$inferSelect[]>;
  create(data: typeof produtoImagens.$inferInsert): Promise<typeof produtoImagens.$inferSelect>;
  delete(id: string): Promise<void>;
  sync(produtoId: string,imagens: Array<Pick<typeof produtoImagens.$inferInsert, 'url' | 'publicId' | 'ordem'>>): Promise<void>;
  
}
