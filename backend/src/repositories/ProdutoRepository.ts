import { db } from '../database/connection';
import { produtos, produtoImagens, categorias } from '../database/schema';
import { IProdutoRepository, ProdutoCatalogo, ProdutoComImagens } from './IProdutoRepository';
import { eq, like, and, asc } from 'drizzle-orm';

export class ProdutoRepository implements IProdutoRepository {
  async findAll(filters?: { category?: string; search?: string; active?: boolean; page?: number; limit?: number }): Promise<ProdutoComImagens[]> {
    const conditions = [];

    if (filters?.category) {
      conditions.push(eq(produtos.categoriaId, filters.category));
    }
    if (filters?.search) {
      conditions.push(like(produtos.nome, `%${filters.search}%`));
    }
    if (filters?.active !== undefined) {
      conditions.push(eq(produtos.ativo, filters.active));
    }

    const page = filters?.page ?? 1;
    const limit = filters?.limit ?? 999;
    const offset = (page - 1) * limit;

    const rows = await db
      .select({
        id: produtos.id,
        categoriaId: produtos.categoriaId,
        nome: produtos.nome,
        slug: produtos.slug,
        descricao: produtos.descricao,
        preco: produtos.preco,
        precoPromocional: produtos.precoPromocional,
        cor: produtos.cor,
        tamanho: produtos.tamanho,
        estoque: produtos.estoque,
        ativo: produtos.ativo,
        createdAt: produtos.createdAt,
        updatedAt: produtos.updatedAt,
        imagemUrl: produtoImagens.url,
      })
      .from(produtos)
      .leftJoin(produtoImagens, eq(produtos.id, produtoImagens.produtoId))
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(asc(produtoImagens.ordem))
      .limit(limit)
      .offset(offset);

    const grouped: Map<string, ProdutoComImagens> = new Map();

    for (const row of rows) {
      if (!grouped.has(row.id)) {
        grouped.set(row.id, {
          id: row.id,
          categoriaId: row.categoriaId,
          nome: row.nome,
          slug: row.slug,
          descricao: row.descricao,
          preco: row.preco,
          precoPromocional: row.precoPromocional,
          cor: row.cor,
          tamanho: row.tamanho,
          estoque: row.estoque,
          ativo: row.ativo,
          createdAt: row.createdAt,
          updatedAt: row.updatedAt,
          imagens: [],
        });
      }
      if (row.imagemUrl) {
        grouped.get(row.id)!.imagens!.push({ url: row.imagemUrl, ordem: grouped.get(row.id)!.imagens!.length + 1 });
      }
    }

    return Array.from(grouped.values());
  }

  async findById(id: string) {
    const result = await db.select().from(produtos).where(eq(produtos.id, id));
    return result[0] || null;
  }

  async findBySlug(slug: string) {
    const result = await db.select().from(produtos).where(eq(produtos.slug, slug));
    return result[0] || null;
  }

  async findBySlugWithCategory(slug: string): Promise<ProdutoCatalogo | null> {
    
    const rows = await db
      .select({
        id: produtos.id,
        categoriaId: produtos.categoriaId,
        nome: produtos.nome,
        slug: produtos.slug,
        descricao: produtos.descricao,
        preco: produtos.preco,
        precoPromocional: produtos.precoPromocional,
        cor: produtos.cor,
        tamanho: produtos.tamanho,
        estoque: produtos.estoque,
        ativo: produtos.ativo,
        createdAt: produtos.createdAt,
        updatedAt: produtos.updatedAt,

        categoria: {
          id: categorias.id,
          nome: categorias.nome,
          slug: categorias.slug
        },

        imagemUrl: produtoImagens.url,
        imagemOrdem: produtoImagens.ordem
      })
      .from(produtos)
      .leftJoin(
        categorias,
        eq(produtos.categoriaId, categorias.id)
      )
      .leftJoin(
        produtoImagens,
        eq(produtos.id, produtoImagens.produtoId)
      )
      .where(eq(produtos.slug, slug))
      .orderBy(asc(produtoImagens.ordem))


    if (!rows.length) {
      return null
    }


    const produto: ProdutoCatalogo = {
      id: rows[0].id,
      categoriaId: rows[0].categoriaId,
      nome: rows[0].nome,
      slug: rows[0].slug,
      descricao: rows[0].descricao,
      preco: rows[0].preco,
      precoPromocional: rows[0].precoPromocional,
      cor: rows[0].cor,
      tamanho: rows[0].tamanho,
      estoque: rows[0].estoque,
      ativo: rows[0].ativo,
      createdAt: rows[0].createdAt,
      updatedAt: rows[0].updatedAt,

      categoria: rows[0].categoria,

      imagens: []
    }


    for (const row of rows) {
      if (row.imagemUrl) {
        produto.imagens.push({
          url: row.imagemUrl,
          ordem: row.imagemOrdem ?? 0
        })
      }
    }


    return produto
  }

  async findCatalogByCategory(
    categoryId: string,
    filters?: {
      page?: number
      limit?: number
      search?: string
    }
  ): Promise<ProdutoCatalogo[]> {

    const conditions = [
      eq(produtos.categoriaId, categoryId),
      eq(produtos.ativo, true)
    ]


    if (filters?.search) {
      conditions.push(
        like(produtos.nome, `%${filters.search}%`)
      )
    }


    const page = filters?.page ?? 1
    const limit = filters?.limit ?? 10
    const offset = (page - 1) * limit


    const rows = await db
      .select({
        id: produtos.id,
        categoriaId: produtos.categoriaId,
        nome: produtos.nome,
        slug: produtos.slug,
        descricao: produtos.descricao,
        preco: produtos.preco,
        precoPromocional: produtos.precoPromocional,
        cor: produtos.cor,
        tamanho: produtos.tamanho,
        estoque: produtos.estoque,
        ativo: produtos.ativo,
        createdAt: produtos.createdAt,
        updatedAt: produtos.updatedAt,

        categoria: {
          id: categorias.id,
          nome: categorias.nome,
          slug: categorias.slug
        },

        imagemUrl: produtoImagens.url,
        imagemOrdem: produtoImagens.ordem

      })
      .from(produtos)
      .innerJoin(
        categorias,
        eq(produtos.categoriaId, categorias.id)
      )
      .leftJoin(
        produtoImagens,
        eq(produtos.id, produtoImagens.produtoId)
      )
      .where(and(...conditions))
      .orderBy(
        asc(produtoImagens.ordem)
      )
      .limit(limit)
      .offset(offset)


    const grouped = new Map<string, ProdutoCatalogo>()


    for (const row of rows) {

      if (!grouped.has(row.id)) {

        grouped.set(row.id, {
          id: row.id,
          categoriaId: row.categoriaId,
          nome: row.nome,
          slug: row.slug,
          descricao: row.descricao,
          preco: row.preco,
          precoPromocional: row.precoPromocional,
          cor: row.cor,
          tamanho: row.tamanho,
          estoque: row.estoque,
          ativo: row.ativo,
          createdAt: row.createdAt,
          updatedAt: row.updatedAt,

          categoria: row.categoria,

          imagens: []
        })

      }


      if (row.imagemUrl) {

        grouped
          .get(row.id)!
          .imagens
          .push({
            url: row.imagemUrl,
            ordem: row.imagemOrdem ?? 0
          })

      }

    }


    return Array.from(grouped.values())
  }

  async create(data: typeof produtos.$inferInsert) {
    const result = await db.insert(produtos).values(data).returning();
    return result[0];
  }

  async update(id: string, data: Partial<typeof produtos.$inferInsert>) {
    const result = await db.update(produtos).set(data).where(eq(produtos.id, id)).returning();
    return result[0];
  }
}
