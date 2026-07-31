import { PedidoRepository } from '../repositories/PedidoRepository';
import { ItemPedidoRepository } from '../repositories/ItemPedidoRepository';
import { ClienteRepository } from '../repositories/ClienteRepository';
import { ProdutoRepository } from '../repositories/ProdutoRepository';
import { ListPedidosService } from '../services/pedido/ListPedidosService';
import { GetPedidoService } from '../services/pedido/GetPedidoService';
import { CreatePedidoManualService } from '../services/pedido/CreatePedidoManualService';
import { CreatePedidoCatalogService } from '../services/pedido/CreatePedidoCatalogService';
import { UpdatePedidoStatusService } from '../services/pedido/UpdatePedidoStatusService';
import { PedidoController } from '../controllers/PedidoController';

export function makePedidoController(): PedidoController {
  const pedidoRepository = new PedidoRepository();
  const itemPedidoRepository = new ItemPedidoRepository();
  const clienteRepository = new ClienteRepository();
  const produtoRepository = new ProdutoRepository();

  const listService = new ListPedidosService(pedidoRepository);
  const getService = new GetPedidoService(pedidoRepository, itemPedidoRepository, clienteRepository);
  const createManualService = new CreatePedidoManualService(pedidoRepository, itemPedidoRepository, clienteRepository, produtoRepository);
  const createCatalogService = new CreatePedidoCatalogService(pedidoRepository, itemPedidoRepository, clienteRepository, produtoRepository);
  const updateStatusService = new UpdatePedidoStatusService(pedidoRepository, produtoRepository, itemPedidoRepository);

  return new PedidoController(listService, getService, createManualService, createCatalogService, updateStatusService);
}
