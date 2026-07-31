import { IBannerRepository } from '../../repositories/IBannerRepository';

export class ListBannersService {
  constructor(private readonly bannerRepository: IBannerRepository) {}

  async execute() {
    return this.bannerRepository.findAll();
  }
}
