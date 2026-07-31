import { PedidoRepository } from '../repositories/PedidoRepository';
import { ClienteRepository } from '../repositories/ClienteRepository';
import { ProdutoRepository } from '../repositories/ProdutoRepository';
import { GetDashboardService } from '../services/dashboard/GetDashboardService';
import { DashboardController } from '../controllers/DashboardController';

export function makeDashboardController(): DashboardController {
  const pedidoRepository = new PedidoRepository();
  const clienteRepository = new ClienteRepository();
  const produtoRepository = new ProdutoRepository();

  const service = new GetDashboardService(pedidoRepository, clienteRepository, produtoRepository);

  return new DashboardController(service);
}
