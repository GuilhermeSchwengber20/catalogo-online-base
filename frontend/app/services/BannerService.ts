import type { ApiResponse } from '~/types'
import type { Banner } from '~/types/banner'

export const BannerService = {
  async getAll() {
    const { $api } = useNuxtApp()
    return $api<ApiResponse<Banner[]>>('/banners')
  },

  async create(data: { titulo?: string, subtitulo?: string, imagem: string, link?: string, ordem?: number }) {
    const { $api } = useNuxtApp()
    return $api<ApiResponse<Banner>>('/banners', { method: 'POST', body: data })
  },

  async update(id: string, data: Partial<Banner>) {
    const { $api } = useNuxtApp()
    return $api<ApiResponse<Banner>>(`/banners/${id}`, { method: 'PUT', body: data })
  },

  async toggleStatus(id: string) {
    const { $api } = useNuxtApp()
    return $api<ApiResponse<Banner>>(`/banners/${id}/status`, { method: 'PATCH' })
  }
}
