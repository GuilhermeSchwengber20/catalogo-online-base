import { IBannerRepository } from '../../repositories/IBannerRepository';
import { ICategoriaRepository } from '../../repositories/ICategoriaRepository';
import { IProdutoRepository } from '../../repositories/IProdutoRepository';

export class GetHomeService {
  constructor(
    private readonly bannerRepository: IBannerRepository,
    private readonly categoriaRepository: ICategoriaRepository,
    private readonly produtoRepository: IProdutoRepository,
  ) {}

  async execute() {
    const [banners, categorias, produtos] = await Promise.all([
      this.bannerRepository.findAll(true),
      this.categoriaRepository.findAll(true),
      this.produtoRepository.findAll({ active: true }),
    ]);

    return {
      banners,
      categorias,
      produtos,
    };
  }
}
