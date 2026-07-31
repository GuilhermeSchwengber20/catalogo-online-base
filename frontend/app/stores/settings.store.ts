import { defineStore } from 'pinia'
import type { PublicSettings } from '~/types/settings'

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    settings: null as PublicSettings | null,
    loaded: false
  }),

  getters: {
    whatsappNumber: state => state.settings?.telefoneWhatsapp || '',

    showPrices: state => state.settings?.mostrarPrecos ?? true,

    storeName: state => state.settings?.nomeLoja || ''
  },

  actions: {
    async fetchSettings() {
      const { $api } = useNuxtApp()
      try {
        const response = await $api<{ success: boolean, data: PublicSettings }>(
          '/settings'
        )
        if (response.success) {
          this.settings = response.data
          this.loaded = true
        }
      } catch {
        this.loaded = false
      }
    }
  }
})
