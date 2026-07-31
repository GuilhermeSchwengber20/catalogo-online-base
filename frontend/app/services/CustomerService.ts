import type { ApiResponse } from '~/types'
import type { Customer } from '~/types/customer'
import type { Order } from '~/types/order'

export const CustomerService = {
  async getAll() {
    const { $api } = useNuxtApp()
    return $api<ApiResponse<Customer[]>>('/clients')
  },

  async getById(id: string) {
    const { $api } = useNuxtApp()
    return $api<ApiResponse<Customer>>(`/clients/${id}`)
  },

  async update(id: string, data: Partial<Customer>) {
    const { $api } = useNuxtApp()
    return $api<ApiResponse<Customer>>(`/clients/${id}`, { method: 'PUT', body: data })
  },

  async getOrders(id: string) {
    const { $api } = useNuxtApp()
    return $api<ApiResponse<{ cliente: Customer, pedidos: Order[] }>>(`/clients/${id}/orders`)
  }
}
