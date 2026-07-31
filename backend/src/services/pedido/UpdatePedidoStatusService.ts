import { IPedidoRepository } from '../../repositories/IPedidoRepository';
import { IProdutoRepository } from '../../repositories/IProdutoRepository';
import { IItemPedidoRepository } from '../../repositories/IItemPedidoRepository';
import { AppError } from '../../shared/AppError';
import { ORDER_STATUS } from '../../shared/constants';

const STATUS_FLOW: Record<string, string[]> = {
  ABERTO: ['EM_COMPRA', 'CANCELADO'],
  EM_COMPRA: ['AGUARDANDO_CLIENTE'],
  AGUARDANDO_CLIENTE: ['CONCLUIDO'],
  CONCLUIDO: [],
  CANCELADO: [],
};

export class UpdatePedidoStatusService {
  constructor(
    private readonly pedidoRepository: IPedidoRepository,
    private readonly produtoRepository: IProdutoRepository,
    private readonly itemPedidoRepository: IItemPedidoRepository,
  ) {}

  async execute(id: string, novoStatus: string) {
    const pedido = await this.pedidoRepository.findById(id);

    if (!pedido) {
      throw new AppError('Pedido não encontrado', 404);
    }

    const statusAtual = pedido.status;
    const permitidos = STATUS_FLOW[statusAtual];

    if (!permitidos || permitidos.length === 0) {
      throw new AppError(`Pedido ${statusAtual} não pode ser alterado`, 422);
    }

    if (!permitidos.includes(novoStatus)) {
      throw new AppError(`Não é permitido alterar de ${statusAtual} para ${novoStatus}`, 422);
    }

    if (novoStatus === ORDER_STATUS.CONCLUIDO) {
      const itens = await this.itemPedidoRepository.findByPedidoId(id);

      for (const item of itens) {
        const produto = await this.produtoRepository.findById(item.produtoId);

        if (produto) {
          const novoEstoque = produto.estoque - item.quantidade;

          if (novoEstoque < 0) {
            throw new AppError(`Estoque insuficiente para "${item.nomeProduto}"`, 422);
          }

          await this.produtoRepository.update(produto.id, {
            estoque: novoEstoque,
            updatedAt: new Date(),
          });
        }
      }
    }

    return this.pedidoRepository.update(id, {
      status: novoStatus,
      updatedAt: new Date(),
    });
  }
}
