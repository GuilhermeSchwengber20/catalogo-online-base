import { IProdutoRepository } from '../../repositories/IProdutoRepository';

export class ListProdutosService {
  constructor(private readonly produtoRepository: IProdutoRepository) {}

  async execute(filters?: { category?: string; search?: string; active?: boolean; page?: number; limit?: number }) {
    return this.produtoRepository.findAll(filters);
  }
}
