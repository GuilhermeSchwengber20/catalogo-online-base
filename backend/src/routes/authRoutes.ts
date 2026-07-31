import { Router } from 'express';
import { makeAuthController } from '../factories/AuthFactory';

const router = Router();
const controller = makeAuthController();

router.post('/login', (req, res) => controller.login(req, res));

export { router as authRoutes };
