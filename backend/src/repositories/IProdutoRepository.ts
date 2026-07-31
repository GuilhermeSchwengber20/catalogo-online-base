import { produtos } from '../database/schema';

export interface ProdutoCatalogo extends Omit<typeof produtos.$inferSelect, 'preco' | 'precoPromocional'> {
  preco: number | null
  precoPromocional: number | null
  imagens: { 
    url: string
    ordem: number
  }[]
  categoria: {
    id: string
    nome: string
    slug: string
  } | null
}

export interface ProdutoComImagens extends Omit<typeof produtos.$inferSelect, 'preco' | 'precoPromocional'> {
  preco: number | null
  precoPromocional: number | null
  imagens?: { url: string; ordem: number }[]
}

export interface IProdutoRepository {
  findAll(filters?: { category?: string; search?: string; active?: boolean; page?: number; limit?: number }): Promise<ProdutoComImagens[]>;
  findById(id: string): Promise<typeof produtos.$inferSelect | null>;
  findBySlug(slug: string): Promise<typeof produtos.$inferSelect | null>;
  findBySlugWithCategory(slug: string): Promise<ProdutoCatalogo | null>;
  findCatalogByCategory(categoryId: string, filters: {page?: number, limit?: number, search?: string}): Promise<ProdutoCatalogo[]>
  create(data: typeof produtos.$inferInsert): Promise<typeof produtos.$inferSelect>;
  update(id: string, data: Partial<typeof produtos.$inferInsert>): Promise<typeof produtos.$inferSelect>;
}
