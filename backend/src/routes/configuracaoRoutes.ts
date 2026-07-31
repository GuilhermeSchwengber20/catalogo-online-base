import { Router } from 'express';
import { makeConfiguracaoController } from '../factories/ConfiguracaoFactory';

const router = Router();
const controller = makeConfiguracaoController();

router.get('/', (req, res) => controller.get(req, res));
router.put('/', (req, res) => controller.update(req, res));

export { router as configuracaoRoutes };
