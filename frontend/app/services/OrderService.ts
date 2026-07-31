import type { ApiResponse } from '~/types'
import type { Order } from '~/types/order'

export interface CreateOrderData {
  cliente: {
    nome: string
    telefone: string
    email?: string
    cidade?: string
  }
  itens: Array<{
    produtoId: string
    quantidade: number
  }>
  observacaoCliente?: string
}

export interface OrderQueryParams {
  status?: string
  cliente?: string
  origem?: string
}

export const OrderService = {
  async createFromCatalog(data: CreateOrderData) {
    const { $api } = useNuxtApp()
    return $api<ApiResponse<{ pedido: Order, mensagem: string }>>('/catalog/orders', {
      method: 'POST',
      body: data
    })
  },

  async getAll(params?: OrderQueryParams) {
    const { $api } = useNuxtApp()
    return $api<ApiResponse<Order[]>>('/orders', { params })
  },

  async getById(id: string) {
    const { $api } = useNuxtApp()
    return $api<ApiResponse<Order>>(`/orders/${id}`)
  },

  async updateStatus(id: string, status: string) {
    const { $api } = useNuxtApp()
    return $api<ApiResponse<Order>>(`/orders/${id}/status`, {
      method: 'PATCH',
      body: { status }
    })
  }
}
