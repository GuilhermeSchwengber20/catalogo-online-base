import { Router } from 'express';
import { makeClienteController } from '../factories/ClienteFactory';

const router = Router();
const controller = makeClienteController();

router.get('/', (req, res) => controller.list(req, res));
router.get('/:id', (req, res) => controller.getById(req, res));
router.put('/:id', (req, res) => controller.update(req, res));
router.get('/:id/orders', (req, res) => controller.getOrders(req, res));

export { router as clienteRoutes };
