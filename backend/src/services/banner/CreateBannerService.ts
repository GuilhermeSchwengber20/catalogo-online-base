import { IBannerRepository } from '../../repositories/IBannerRepository';
import { CreateBannerDTO } from '../../dtos/BannerDTO';

export class CreateBannerService {
  constructor(private readonly bannerRepository: IBannerRepository) {}

  async execute(data: CreateBannerDTO) {
    return this.bannerRepository.create({
      titulo: data.titulo ?? null,
      subtitulo: data.subtitulo ?? null,
      imagem: data.imagem,
      link: data.link ?? null,
      ordem: data.ordem ?? 0,
      ativo: true,
    });
  }
}
