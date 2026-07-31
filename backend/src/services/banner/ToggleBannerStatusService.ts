import { IBannerRepository } from '../../repositories/IBannerRepository';
import { AppError } from '../../shared/AppError';

export class ToggleBannerStatusService {
  constructor(private readonly bannerRepository: IBannerRepository) {}

  async execute(id: string) {
    const banner = await this.bannerRepository.findById(id);

    if (!banner) {
      throw new AppError('Banner não encontrado', 404);
    }

    return this.bannerRepository.update(id, {
      ativo: !banner.ativo,
      updatedAt: new Date(),
    });
  }
}
