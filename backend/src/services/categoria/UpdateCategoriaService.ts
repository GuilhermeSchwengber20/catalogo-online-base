import { ICategoriaRepository } from '../../repositories/ICategoriaRepository';
import { AppError } from '../../shared/AppError';
import { UpdateCategoriaDTO } from '../../dtos/CategoriaDTO';

export class UpdateCategoriaService {
  constructor(private readonly categoriaRepository: ICategoriaRepository) {}

  async execute(id: string, data: UpdateCategoriaDTO) {
    const categoria = await this.categoriaRepository.findById(id);

    if (!categoria) {
      throw new AppError('Categoria não encontrada', 404);
    }

    if (data.slug && data.slug !== categoria.slug) {
      const existing = await this.categoriaRepository.findBySlug(data.slug);
      if (existing) {
        throw new AppError('Já existe uma categoria com este slug', 409);
      }
    }

    return this.categoriaRepository.update(id, {
      ...data,
      updatedAt: new Date(),
    });
  }
}
