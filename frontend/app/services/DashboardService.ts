import type { ApiResponse } from '~/types'
import type { DashboardData } from '~/types/dashboard'

export const DashboardService = {
  async get() {
    const { $api } = useNuxtApp()
    return $api<ApiResponse<DashboardData>>('/dashboard')
  }
}
