import { IProdutoRepository } from '../../repositories/IProdutoRepository';
import { AppError } from '../../shared/AppError';
import { UpdateProdutoDTO } from '../../dtos/ProdutoDTO';
import { IProdutoImagemRepository } from '@/repositories';
import { db } from '@/database/connection';

export class UpdateProdutoService {
  constructor(
    private readonly produtoRepository: IProdutoRepository,
    private readonly produtoImagemRepository: IProdutoImagemRepository,

  ) {}

  async execute(id: string, data: UpdateProdutoDTO) {
    const produto = await this.produtoRepository.findById(id);

    if (!produto) {
      throw new AppError('Produto não encontrado', 404);
    }

    if (data.slug && data.slug !== produto.slug) {
      const existing = await this.produtoRepository.findBySlug(data.slug);
      if (existing) {
        throw new AppError('Já existe um produto com este slug', 409);
      }
    }

    if (data.precoPromocional && data.preco && Number(data.precoPromocional) > Number(data.preco)) {
      throw new AppError('Preço promocional não pode ser maior que o preço original', 422);
    }

    if (data.imagens) {
      await this.produtoImagemRepository.sync(
        produto.id,
        data.imagens
      )
    }

    return this.produtoRepository.update(id, {
      ...data,
      updatedAt: new Date(),
    });
  }
}
