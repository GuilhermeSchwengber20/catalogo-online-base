import { IProdutoRepository } from '../../repositories/IProdutoRepository';
import { AppError } from '../../shared/AppError';

export class UpdateEstoqueService {
  constructor(private readonly produtoRepository: IProdutoRepository) {}

  async execute(id: string, quantidade: number) {
    const produto = await this.produtoRepository.findById(id);

    if (!produto) {
      throw new AppError('Produto não encontrado', 404);
    }

    if (quantidade < 0) {
      throw new AppError('Estoque não pode ficar negativo', 422);
    }

    return this.produtoRepository.update(id, {
      estoque: quantidade,
      updatedAt: new Date(),
    });
  }
}
