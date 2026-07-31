import { IPedidoRepository } from '../../repositories/IPedidoRepository';

export class ListPedidosService {
  constructor(private readonly pedidoRepository: IPedidoRepository) {}

  async execute(filters?: { status?: string; cliente?: string; cidade?: string; origem?: string }) {
    return this.pedidoRepository.findAll(filters);
  }
}
