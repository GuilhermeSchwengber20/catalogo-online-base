import { ClienteRepository } from '../repositories/ClienteRepository';
import { PedidoRepository } from '../repositories/PedidoRepository';
import { ItemPedidoRepository } from '../repositories/ItemPedidoRepository';
import { ListClientesService } from '../services/cliente/ListClientesService';
import { GetClienteService } from '../services/cliente/GetClienteService';
import { UpdateClienteService } from '../services/cliente/UpdateClienteService';
import { GetClienteOrdersService } from '../services/cliente/GetClienteOrdersService';
import { ClienteController } from '../controllers/ClienteController';

export function makeClienteController(): ClienteController {
  const clienteRepository = new ClienteRepository();
  const pedidoRepository = new PedidoRepository();
  const itemPedidoRepository = new ItemPedidoRepository();

  const listService = new ListClientesService(clienteRepository);
  const getService = new GetClienteService(clienteRepository);
  const updateService = new UpdateClienteService(clienteRepository);
  const ordersService = new GetClienteOrdersService(clienteRepository, pedidoRepository, itemPedidoRepository);

  return new ClienteController(listService, getService, updateService, ordersService);
}
