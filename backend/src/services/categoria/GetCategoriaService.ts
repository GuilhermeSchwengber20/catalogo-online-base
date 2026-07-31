import { ICategoriaRepository } from '../../repositories/ICategoriaRepository';
import { AppError } from '../../shared/AppError';

export class GetCategoriaService {
  constructor(private readonly categoriaRepository: ICategoriaRepository) {}

  async execute(id: string) {
    const categoria = await this.categoriaRepository.findById(id);

    if(!categoria) {
      throw new AppError('Categoria não encontrada', 404)
    }

    return categoria;
  }
}
