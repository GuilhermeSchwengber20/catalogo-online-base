import { Router } from 'express';
import { makePedidoController } from '../factories/PedidoFactory';

const router = Router();
const controller = makePedidoController();

router.get('/', (req, res) => controller.list(req, res));
router.get('/:id', (req, res) => controller.getById(req, res));
router.post('/', (req, res) => controller.createManual(req, res));
router.patch('/:id/status', (req, res) => controller.updateStatus(req, res));

export { router as pedidoRoutes };
