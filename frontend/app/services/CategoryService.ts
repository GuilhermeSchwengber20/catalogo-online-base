import type { ApiResponse } from '~/types'
import type { Category } from '~/types/category'

export const CategoryService = {
  async getAll() {
    const { $api } = useNuxtApp()
    return $api<ApiResponse<Category[]>>('/categories')
  },

  async getById(id: string) {
    const { $api } = useNuxtApp()
    return $api<ApiResponse<Category>>(`/categories/${id}`)
  },

  async create(data: { nome: string, descricao?: string, imagem?: string, ordem?: number }) {
    const { $api } = useNuxtApp()
    return $api<ApiResponse<Category>>('/categories', { method: 'POST', body: data })
  },

  async update(id: string, data: Partial<Category>) {
    const { $api } = useNuxtApp()
    return $api<ApiResponse<Category>>(`/categories/${id}`, { method: 'PUT', body: data })
  },

  async toggleStatus(id: string) {
    const { $api } = useNuxtApp()
    return $api<ApiResponse<Category>>(`/categories/${id}/status`, { method: 'PATCH' })
  }
}
