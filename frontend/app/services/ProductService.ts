import type { ApiResponse } from '~/types'
import type { Product } from '~/types/product'

export interface ProductQueryParams {
  category?: string
  search?: string
  page?: number
  limit?: number
}

export const ProductService = {

  async getAll(params?: { category?: string, search?: string, active?: boolean, page?: number, limit?: number }) {
    const { $api } = useNuxtApp()
    return $api<ApiResponse<Product[]>>('/products', { params })
  },

  async getById(id: string) {
    const { $api } = useNuxtApp()
    return $api<ApiResponse<Product>>(`/products/${id}`)
  },

  async create(data: Omit<Partial<Product>, 'imagens'> & { imagens?: Array<{ url: string, ordem: number, publicId: string }> }) {
    const { $api } = useNuxtApp()
    return $api<ApiResponse<Product>>('/products', { method: 'POST', body: data })
  },

  async update(id: string, data: Omit<Partial<Product>, 'imagens'> & { imagens?: Array<{ url: string, ordem: number, publicId: string }> }) {
    const { $api } = useNuxtApp()
    return $api<ApiResponse<Product>>(`/products/${id}`, { method: 'PUT', body: data })
  },

  async toggleStatus(id: string) {
    const { $api } = useNuxtApp()
    return $api<ApiResponse<Product>>(`/products/${id}/status`, { method: 'PATCH' })
  },

  async updateStock(id: string, quantidade: number) {
    const { $api } = useNuxtApp()
    return $api(`/products/${id}/estoque`, { method: 'PATCH', body: { quantidade } })
  },

  async deleteImage(productId: string, imageId: string) {
    const { $api } = useNuxtApp()
    return $api(`/products/${productId}/image/${imageId}`, { method: 'DELETE' })
  }
}
