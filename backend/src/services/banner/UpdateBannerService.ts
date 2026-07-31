import { IBannerRepository } from '../../repositories/IBannerRepository';
import { AppError } from '../../shared/AppError';
import { UpdateBannerDTO } from '../../dtos/BannerDTO';

export class UpdateBannerService {
  constructor(private readonly bannerRepository: IBannerRepository) {}

  async execute(id: string, data: UpdateBannerDTO) {
    const banner = await this.bannerRepository.findById(id);

    if (!banner) {
      throw new AppError('Banner não encontrado', 404);
    }

    return this.bannerRepository.update(id, {
      ...data,
      updatedAt: new Date(),
    });
  }
}
