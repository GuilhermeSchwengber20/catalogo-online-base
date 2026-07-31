import { ICategoriaRepository } from '../../repositories/ICategoriaRepository';
import { IProdutoRepository } from '../../repositories/IProdutoRepository';
import { AppError } from '../../shared/AppError';

export class ToggleCategoriaStatusService {
  constructor(
    private readonly categoriaRepository: ICategoriaRepository,
    private readonly produtoRepository: IProdutoRepository,
  ) {}

  async execute(id: string) {
    const categoria = await this.categoriaRepository.findById(id);

    if (!categoria) {
      throw new AppError('Categoria não encontrada', 404);
    }

    if (categoria.ativo) {
      const produtos = await this.produtoRepository.findAll({ category: id });
      if (produtos.length > 0) {
        throw new AppError(`Categoria possui ${produtos.length} produto(s) associado(s). Desative-os primeiro.`, 422);
      }
    }

    return this.categoriaRepository.update(id, {
      ativo: !categoria.ativo,
      updatedAt: new Date(),
    });
  }
}
