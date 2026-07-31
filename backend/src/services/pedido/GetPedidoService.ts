import { IPedidoRepository } from '../../repositories/IPedidoRepository';
import { IItemPedidoRepository } from '../../repositories/IItemPedidoRepository';
import { IClienteRepository } from '../../repositories/IClienteRepository';
import { AppError } from '../../shared/AppError';

export class GetPedidoService {
  constructor(
    private readonly pedidoRepository: IPedidoRepository,
    private readonly itemPedidoRepository: IItemPedidoRepository,
    private readonly clienteRepository: IClienteRepository,
  ) {}

  async execute(id: string) {
    const pedido = await this.pedidoRepository.findById(id);

    if (!pedido) {
      throw new AppError('Pedido não encontrado', 404);
    }

    const [itens, cliente] = await Promise.all([
      this.itemPedidoRepository.findByPedidoId(id),
      this.clienteRepository.findById(pedido.clienteId),
    ]);

    return { ...pedido, itens, cliente };
  }
}
