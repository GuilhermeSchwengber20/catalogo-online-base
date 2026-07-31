import { Request, Response } from 'express';
import { ListBannersService } from '../services/banner/ListBannersService';
import { CreateBannerService } from '../services/banner/CreateBannerService';
import { UpdateBannerService } from '../services/banner/UpdateBannerService';
import { ToggleBannerStatusService } from '../services/banner/ToggleBannerStatusService';
import { createBannerSchema, updateBannerSchema } from '../schemas/bannerSchema';

export class BannerController {
  constructor(
    private readonly listBannersService: ListBannersService,
    private readonly createBannerService: CreateBannerService,
    private readonly updateBannerService: UpdateBannerService,
    private readonly toggleBannerStatusService: ToggleBannerStatusService,
  ) {}

  async list(req: Request, res: Response) {
    const banners = await this.listBannersService.execute();
    res.json({ success: true, data: banners });
  }

  async create(req: Request, res: Response) {
    const data = createBannerSchema.parse(req.body);
    const banner = await this.createBannerService.execute(data);
    res.status(201).json({ success: true, data: banner });
  }

  async update(req: Request, res: Response) {
    const data = updateBannerSchema.parse(req.body);
    const banner = await this.updateBannerService.execute(req.params.id, data);
    res.json({ success: true, data: banner });
  }

  async toggleStatus(req: Request, res: Response) {
    const banner = await this.toggleBannerStatusService.execute(req.params.id);
    res.json({ success: true, data: banner });
  }
}
