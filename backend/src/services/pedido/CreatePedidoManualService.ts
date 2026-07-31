import { IPedidoRepository } from '../../repositories/IPedidoRepository';
import { IItemPedidoRepository } from '../../repositories/IItemPedidoRepository';
import { IClienteRepository } from '../../repositories/IClienteRepository';
import { IProdutoRepository } from '../../repositories/IProdutoRepository';
import { AppError } from '../../shared/AppError';
import { ORDER_ORIGIN } from '../../shared/constants';
import { CreatePedidoManualDTO } from '../../dtos/PedidoDTO';

export class CreatePedidoManualService {
  constructor(
    private readonly pedidoRepository: IPedidoRepository,
    private readonly itemPedidoRepository: IItemPedidoRepository,
    private readonly clienteRepository: IClienteRepository,
    private readonly produtoRepository: IProdutoRepository,
  ) {}

  async execute(data: CreatePedidoManualDTO) {
    let clienteId = data.clienteId;

    if (!clienteId) {
      if (!data.cliente) {
        throw new AppError('Informe um clienteId ou dados do cliente', 422);
      }
      const cliente = await this.clienteRepository.create({
        nome: data.cliente.nome,
        telefone: data.cliente.telefone,
        email: data.cliente.email ?? null,
        cidade: data.cliente.cidade ?? null,
      });
      clienteId = cliente.id;
    } else {
      const cliente = await this.clienteRepository.findById(clienteId);
      if (!cliente) {
        throw new AppError('Cliente não encontrado', 404);
      }
    }

    let subtotal = 0;
    const itensParaCriar = [];

    for (const item of data.itens) {
      const produto = await this.produtoRepository.findById(item.produtoId);

      if (!produto) {
        throw new AppError(`Produto ${item.produtoId} não encontrado`, 404);
      }

      const precoUnitario = produto.precoPromocional || produto.preco;
      const itemSubtotal = (Number(precoUnitario) * item.quantidade);
      subtotal += Number(itemSubtotal);

      itensParaCriar.push({
        produtoId: produto.id,
        nomeProduto: produto.nome,
        precoUnitario,
        quantidade: item.quantidade,
        subtotal: itemSubtotal,
      });
    }

    const pedido = await this.pedidoRepository.create({
      clienteId,
      origem: ORDER_ORIGIN.MANUAL,
      status: 'ABERTO',
      observacaoInterna: data.observacaoInterna ?? null,
      subtotal: subtotal,
      desconto: 0,
      total: subtotal,
    });

    await this.itemPedidoRepository.createMany(
      itensParaCriar.map((item) => ({
        ...item,
        pedidoId: pedido.id,
      })),
    );

    return this.pedidoRepository.findById(pedido.id);
  }
}
