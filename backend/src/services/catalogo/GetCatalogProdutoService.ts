import { IProdutoRepository } from '../../repositories/IProdutoRepository';
import { IProdutoImagemRepository } from '../../repositories/IProdutoImagemRepository';
import { AppError } from '../../shared/AppError';

export class GetCatalogProdutoService {
  constructor(
    private readonly produtoRepository: IProdutoRepository,
    private readonly produtoImagemRepository: IProdutoImagemRepository,
  ) {}

  async execute(slug: string) {
    const produto = await this.produtoRepository.findBySlugWithCategory(slug);

    if (!produto) {
      throw new AppError('Produto não encontrado', 404);
    }

    if (!produto.ativo) {
      throw new AppError('Produto não encontrado', 404);
    }

    // const imagens = await this.produtoImagemRepository.findByProdutoId(produto.id);

    return { ...produto };
  }
}
