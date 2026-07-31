import type { Order } from '~/types/order'
import { OrderService } from '~/services/OrderService'
import type { OrderQueryParams } from '~/services/OrderService'

export function useAdminOrders() {
  const orders = ref<Order[]>([])
  const currentOrder = ref<Order | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchOrders(params?: OrderQueryParams) {
    loading.value = true
    error.value = null

    try {
      const response = await OrderService.getAll(params)
      if (response.success) {
        orders.value = response.data
      }
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : 'Erro ao carregar pedidos'
    } finally {
      loading.value = false
    }
  }

  async function fetchOrder(id: string) {
    loading.value = true
    error.value = null

    try {
      const response = await OrderService.getById(id)
      if (response.success) {
        currentOrder.value = response.data
      } else {
        error.value = 'Pedido não encontrado'
      }
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : 'Erro ao carregar pedido'
    } finally {
      loading.value = false
    }
  }

  async function updateStatus(id: string, status: string) {
    error.value = null

    try {
      const response = await OrderService.updateStatus(id, status)
      if (response.success) {
        currentOrder.value = response.data
        return true
      }
      return false
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : 'Erro ao atualizar status'
      return false
    }
  }

  return {
    orders,
    currentOrder,
    loading,
    error,
    fetchOrders,
    fetchOrder,
    updateStatus
  }
}
