import { Router } from 'express';
import { makeBannerController } from '../factories/BannerFactory';

const router = Router();
const controller = makeBannerController();

router.get('/', (req, res) => controller.list(req, res));
router.post('/', (req, res) => controller.create(req, res));
router.put('/:id', (req, res) => controller.update(req, res));
router.patch('/:id/status', (req, res) => controller.toggleStatus(req, res));

export { router as bannerRoutes };
