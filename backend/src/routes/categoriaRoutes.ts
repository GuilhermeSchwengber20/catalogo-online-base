import { Router } from 'express';
import { makeCategoriaController } from '../factories/CategoriaFactory';

const router = Router();
const controller = makeCategoriaController();

router.get('/', (req, res) => controller.list(req, res));
router.get('/:id', (req, res) => controller.getById(req, res));
router.post('/', (req, res) => controller.create(req, res));
router.put('/:id', (req, res) => controller.update(req, res));
router.patch('/:id/status', (req, res) => controller.toggleStatus(req, res));

export { router as categoriaRoutes };
