import { ofetch } from 'ofetch'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const api = ofetch.create({
    baseURL: config.public.apiBaseUrl,
    onRequest({ options }) {
      const authStore = useAuthStore()
      if (authStore.token) {
        const headers = new Headers(options.headers)
        headers.set('Authorization', `Bearer ${authStore.token}`)
        options.headers = headers
      }
    },
    onResponseError({ response }) {
      if (response.status === 401) {
        const authStore = useAuthStore()
        authStore.logout()

        const nuxtApp = useNuxtApp()
        const { $toast } = nuxtApp
        $toast?.('Sessão expirada. Faça login novamente.', { color: 'error' })
        navigateTo('/admin/login')
      }
    }
  })

  return {
    provide: {
      api
    }
  }
})
