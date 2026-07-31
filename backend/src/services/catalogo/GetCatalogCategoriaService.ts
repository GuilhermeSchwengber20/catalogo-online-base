import { ICategoriaRepository, IProdutoRepository } from "../../repositories"
import { AppError } from "../../shared/AppError"

export class GetCatalogCategoriaService {

  constructor(
    private readonly categoriaRepository: ICategoriaRepository,
    private readonly produtoRepository: IProdutoRepository
  ) {}


  async execute(
    slug: string,
    filters?: {
      page?: number
      limit?: number
      search?: string }
  ) {

    const categoria = await this.categoriaRepository.findBySlug(slug)


    if (!categoria) {
      throw new AppError('Categoria não encontrada', 404)
    }

    const produtos = await this.produtoRepository.findCatalogByCategory(categoria.id, filters ?? {})

    return {
      ...categoria,
      produtos
    }
  }
}