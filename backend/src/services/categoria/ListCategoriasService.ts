import { ICategoriaRepository } from '../../repositories/ICategoriaRepository';

export class ListCategoriasService {
  constructor(private readonly categoriaRepository: ICategoriaRepository) {}

  async execute() {
    return this.categoriaRepository.findAll();
  }
}
