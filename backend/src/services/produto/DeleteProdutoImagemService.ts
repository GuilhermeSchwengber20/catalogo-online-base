import { IProdutoImagemRepository } from '../../repositories/IProdutoImagemRepository';
import { AppError } from '../../shared/AppError';

export class DeleteProdutoImagemService {
  constructor(private readonly produtoImagemRepository: IProdutoImagemRepository) {}

  async execute(imageId: string) {
    await this.produtoImagemRepository.delete(imageId);
  }
}
