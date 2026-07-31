import { IPedidoRepository } from '../../repositories/IPedidoRepository';
import { IClienteRepository } from '../../repositories/IClienteRepository';
import { IProdutoRepository } from '../../repositories/IProdutoRepository';
import { ORDER_STATUS } from '../../shared/constants';

export class GetDashboardService {
  constructor(
    private readonly pedidoRepository: IPedidoRepository,
    private readonly clienteRepository: IClienteRepository,
    private readonly produtoRepository: IProdutoRepository,
  ) {}

  async execute() {
    const [pedidos, clientes, produtos] = await Promise.all([
      this.pedidoRepository.findAll(),
      this.clienteRepository.findAll(),
      this.produtoRepository.findAll(),
    ]);

    const pedidosPorStatus = {
      ABERTO: 0,
      EM_COMPRA: 0,
      AGUARDANDO_CLIENTE: 0,
      CONCLUIDO: 0,
      CANCELADO: 0,
    };

    for (const pedido of pedidos) {
      const status = pedido.status as keyof typeof pedidosPorStatus;
      if (pedidosPorStatus[status] !== undefined) {
        pedidosPorStatus[status]++;
      }
    }

    const produtosAtivos = produtos.filter((p) => p.ativo).length;
    const produtosInativos = produtos.length - produtosAtivos;
    const estoqueTotal = produtos.reduce((acc, p) => acc + p.estoque, 0);
    const estoqueBaixo = produtos.filter((p) => p.estoque > 0 && p.estoque <= 5).length;
    const semEstoque = produtos.filter((p) => p.estoque === 0).length;

    return {
      pedidos: {
        total: pedidos.length,
        porStatus: pedidosPorStatus,
      },
      clientes: {
        total: clientes.length,
      },
      produtos: {
        total: produtos.length,
        ativos: produtosAtivos,
        inativos: produtosInativos,
      },
      estoque: {
        total: estoqueTotal,
        baixo: estoqueBaixo,
        semEstoque,
      },
    };
  }
}
