import { IPedidoRepository } from '../../repositories/IPedidoRepository';
import { IItemPedidoRepository } from '../../repositories/IItemPedidoRepository';
import { IClienteRepository } from '../../repositories/IClienteRepository';
import { IProdutoRepository } from '../../repositories/IProdutoRepository';
import { AppError } from '../../shared/AppError';
import { ORDER_ORIGIN } from '../../shared/constants';
import { CreatePedidoCatalogDTO } from '../../dtos/PedidoDTO';

export class CreatePedidoCatalogService {
  constructor(
    private readonly pedidoRepository: IPedidoRepository,
    private readonly itemPedidoRepository: IItemPedidoRepository,
    private readonly clienteRepository: IClienteRepository,
    private readonly produtoRepository: IProdutoRepository,
  ) {}

  async execute(data: CreatePedidoCatalogDTO) {
    let cliente = await this.clienteRepository.findByTelefone(data.cliente.telefone);

    if (cliente) {
      cliente = await this.clienteRepository.update(cliente.id, {
        nome: data.cliente.nome,
        telefone: data.cliente.telefone,
        email: data.cliente.email ?? null,
        cidade: data.cliente.cidade ?? null,
        updatedAt: new Date(),
      });
    } else {
      cliente = await this.clienteRepository.create({
        nome: data.cliente.nome,
        telefone: data.cliente.telefone,
        email: data.cliente.email ?? null,
        cidade: data.cliente.cidade ?? null,
      });
    }

    let subtotal = 0;
    const itensParaCriar = [];

    for (const item of data.itens) {
      const produto = await this.produtoRepository.findById(item.produtoId);

      if (!produto) {
        throw new AppError(`Produto não encontrado`, 404);
      }

      if (!produto.ativo) {
        throw new AppError(`Produto indisponível`, 400);
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
      clienteId: cliente.id,
      origem: ORDER_ORIGIN.CATALOGO,
      status: 'ABERTO',
      observacaoCliente: data.observacaoCliente ?? null,
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

    const mensagem = this.gerarMensagemWhatsApp(cliente.nome, itensParaCriar, subtotal.toFixed(2));

    return { pedido, mensagem };
  }

  private gerarMensagemWhatsApp(clienteNome: string, itens: { nomeProduto: string; quantidade: number }[], total: string): string {
    let mensagem = `Olá! Recebemos um pedido de ${clienteNome}:\n\n`;

    for (const item of itens) {
      mensagem += `- ${item.nomeProduto} (x${item.quantidade})\n`;
    }

    mensagem += `\nTotal: R$ ${total}`;
    return encodeURIComponent(mensagem);
  }
}
