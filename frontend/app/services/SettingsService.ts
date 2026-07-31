import type { ApiResponse } from '~/types'
import type { Settings } from '~/types/settings'

export const SettingsService = {
  async getAll() {
    const { $api } = useNuxtApp()
    return $api<ApiResponse<Settings>>('/settings')
  },

  async update(data: Partial<Settings>) {
    const { $api } = useNuxtApp()
    return $api<ApiResponse<Settings>>('/settings', { method: 'PUT', body: data })
  }
}
