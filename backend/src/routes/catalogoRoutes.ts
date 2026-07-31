import { Router } from 'express';
import { makeCatalogoController } from '../factories/CatalogoFactory';
import { PedidoRepository } from '../repositories/PedidoRepository';
import { ItemPedidoRepository } from '../repositories/ItemPedidoRepository';
import { ClienteRepository } from '../repositories/ClienteRepository';
import { ProdutoRepository } from '../repositories/ProdutoRepository';
import { CreatePedidoCatalogService } from '../services/pedido/CreatePedidoCatalogService';
import { createPedidoCatalogSchema } from '../schemas/pedidoSchema';

const router = Router();
const controller = makeCatalogoController();

const createPedidoCatalogService = new CreatePedidoCatalogService(
  new PedidoRepository(),
  new ItemPedidoRepository(),
  new ClienteRepository(),
  new ProdutoRepository(),
);

router.get('/home', (req, res) => controller.home(req, res));
router.get('/products', (req, res) => controller.listProducts(req, res));
router.get('/products/:slug', (req, res) => controller.getProduct(req, res));
router.get('/categories/:slug', (req, res) => controller.getCategory(req, res));
router.get('/settings', (req, res) => controller.getPublicSettings(req, res))
router.post('/orders', async (req, res) => {
  const data = createPedidoCatalogSchema.parse(req.body);
  const result = await createPedidoCatalogService.execute(data);
  res.status(201).json({ success: true, data: result });
});

export { router as catalogoRoutes };
