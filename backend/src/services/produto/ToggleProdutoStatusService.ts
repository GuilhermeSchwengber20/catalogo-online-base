import { IProdutoRepository } from '../../repositories/IProdutoRepository';
import { AppError } from '../../shared/AppError';

export class ToggleProdutoStatusService {
  constructor(private readonly produtoRepository: IProdutoRepository) {}

  async execute(id: string) {
    const produto = await this.produtoRepository.findById(id);

    if (!produto) {
      throw new AppError('Produto não encontrado', 404);
    }

    return this.produtoRepository.update(id, {
      ativo: !produto.ativo,
      updatedAt: new Date(),
    });
  }
}
