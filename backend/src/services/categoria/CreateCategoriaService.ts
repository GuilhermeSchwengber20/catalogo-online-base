import { ICategoriaRepository } from '../../repositories/ICategoriaRepository';
import { AppError } from '../../shared/AppError';
import { slugify } from '../../shared/utils';
import { CreateCategoriaDTO } from '../../dtos/CategoriaDTO';

export class CreateCategoriaService {
  constructor(private readonly categoriaRepository: ICategoriaRepository) {}

  async execute(data: CreateCategoriaDTO) {
    const slug = slugify(data.nome);

    const existing = await this.categoriaRepository.findBySlug(slug);

    if (existing) {
      throw new AppError('Já existe uma categoria com este slug', 409);
    }

    return this.categoriaRepository.create({
      nome: data.nome,
      slug,
      descricao: data.descricao ?? null,
      imagem: data.imagem ?? null,
      ordem: data.ordem ?? 0,
      ativo: true,
    });
  }
}
