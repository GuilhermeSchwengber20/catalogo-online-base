import { IClienteRepository } from '../../repositories/IClienteRepository';
import { IPedidoRepository } from '../../repositories/IPedidoRepository';
import { IItemPedidoRepository } from '../../repositories/IItemPedidoRepository';
import { AppError } from '../../shared/AppError';

export class GetClienteOrdersService {
  constructor(
    private readonly clienteRepository: IClienteRepository,
    private readonly pedidoRepository: IPedidoRepository,
    private readonly itemPedidoRepository: IItemPedidoRepository,
  ) {}

  async execute(clienteId: string) {
    const cliente = await this.clienteRepository.findById(clienteId);

    if (!cliente) {
      throw new AppError('Cliente não encontrado', 404);
    }

    const pedidos = await this.pedidoRepository.findAll({ cliente: clienteId });

    const pedidosComItens = await Promise.all(
      pedidos.map(async (pedido) => {
        const itens = await this.itemPedidoRepository.findByPedidoId(pedido.id);
        return { ...pedido, itens };
      }),
    );

    return {
      cliente,
      pedidos: pedidosComItens,
    };
  }
}
