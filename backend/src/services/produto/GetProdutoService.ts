import { IProdutoRepository } from '../../repositories/IProdutoRepository';
import { IProdutoImagemRepository } from '../../repositories/IProdutoImagemRepository';
import { AppError } from '../../shared/AppError';

export class GetProdutoService {
  constructor(
    private readonly produtoRepository: IProdutoRepository,
    private readonly produtoImagemRepository: IProdutoImagemRepository,
  ) {}

  async execute(id: string) {
    const produto = await this.produtoRepository.findById(id);

    if (!produto) {
      throw new AppError('Produto não encontrado', 404);
    }

    const imagens = await this.produtoImagemRepository.findByProdutoId(id);

    return { ...produto, imagens };
  }
}
