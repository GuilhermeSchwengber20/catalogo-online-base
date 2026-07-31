import type { Customer } from './customer'

export type OrderStatus = 'ABERTO' | 'EM_COMPRA' | 'AGUARDANDO_CLIENTE' | 'CONCLUIDO' | 'CANCELADO'

export type OrderOrigin = 'CATALOGO' | 'MANUAL'

export interface OrderItem {
  id: string
  pedidoId: string
  produtoId: string
  nomeProduto: string
  precoUnitario: string
  quantidade: number
  subtotal: string
  createdAt: string
  updatedAt: string
}

export interface Order {
  id: string
  clienteId: string
  origem: OrderOrigin
  status: OrderStatus
  observacaoCliente: string | null
  observacaoInterna: string | null
  subtotal: string
  desconto: string
  total: string
  itens?: OrderItem[]
  cliente?: Customer
  createdAt: string
  updatedAt: string
}
