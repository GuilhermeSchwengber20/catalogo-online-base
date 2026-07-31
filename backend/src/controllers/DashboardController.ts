import { Request, Response } from 'express';
import { GetDashboardService } from '../services/dashboard/GetDashboardService';

export class DashboardController {
  constructor(private readonly getDashboardService: GetDashboardService) {}

  async get(req: Request, res: Response) {
    const data = await this.getDashboardService.execute();
    res.json({ success: true, data });
  }
}
