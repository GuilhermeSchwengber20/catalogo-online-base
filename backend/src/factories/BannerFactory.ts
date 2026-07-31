import { BannerRepository } from '../repositories/BannerRepository';
import { ListBannersService } from '../services/banner/ListBannersService';
import { CreateBannerService } from '../services/banner/CreateBannerService';
import { UpdateBannerService } from '../services/banner/UpdateBannerService';
import { ToggleBannerStatusService } from '../services/banner/ToggleBannerStatusService';
import { BannerController } from '../controllers/BannerController';

export function makeBannerController(): BannerController {
  const repository = new BannerRepository();

  const listService = new ListBannersService(repository);
  const createService = new CreateBannerService(repository);
  const updateService = new UpdateBannerService(repository);
  const toggleService = new ToggleBannerStatusService(repository);

  return new BannerController(listService, createService, updateService, toggleService);
}
