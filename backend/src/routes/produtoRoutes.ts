import { Router } from 'express';
import { makeProdutoController } from '../factories/ProdutoFactory';

const router = Router();
const controller = makeProdutoController();

router.get('/', (req, res) => controller.list(req, res));
router.get('/:id', (req, res) => controller.getById(req, res));
router.post('/', (req, res) => controller.create(req, res));
router.put('/:id', (req, res) => controller.update(req, res));
router.patch('/:id/status', (req, res) => controller.toggleStatus(req, res));
router.patch('/:id/estoque', (req, res) => controller.updateEstoque(req, res));
router.delete('/:id/image/:imageId', (req, res) => controller.deleteImage(req, res));

export { router as produtoRoutes };
