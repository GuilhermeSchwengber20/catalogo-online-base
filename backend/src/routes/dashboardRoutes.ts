import { Router } from 'express';
import { makeDashboardController } from '../factories/DashboardFactory';

const router = Router();
const controller = makeDashboardController();

router.get('/', (req, res) => controller.get(req, res));

export { router as dashboardRoutes };
