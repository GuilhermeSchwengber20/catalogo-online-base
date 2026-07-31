import { IProdutoRepository, ProdutoComImagens } from '../../repositories/IProdutoRepository';
import { db } from '../../database/connection';
import { produtos } from '../../database/schema';
import { eq, like, and, sql } from 'drizzle-orm';

export class ListCatalogProdutosService {
  constructor(private readonly produtoRepository: IProdutoRepository) {}

  async execute(category?: string, search?: string, page?: number, limit?: number): Promise<{ produtos: ProdutoComImagens[]; total: number }> {
    const produtosList = await this.produtoRepository.findAll({
      category,
      search,
      active: true,
      page,
      limit,
    });

    const countConditions = [eq(produtos.ativo, true)];
    if (category) countConditions.push(eq(produtos.categoriaId, category));
    if (search) countConditions.push(like(produtos.nome, `%${search}%`));

    const [countResult] = await db
      .select({ count: sql<number>`count(*)` })
      .from(produtos)
      .where(and(...countConditions));

    return { produtos: produtosList, total: Number(countResult?.count || 0) };
  }
}
