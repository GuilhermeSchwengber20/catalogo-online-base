import { defineStore } from 'pinia'
import type { ApiResponse } from '~/types'

interface AuthUser {
  id: string
  nome: string
  email: string
}

interface LoginResponse {
  token: string
  usuario: AuthUser
}

const STORAGE_KEY = 'dona-decor-auth'

function loadSession(): { user: AuthUser | null, token: string | null } {
  if (import.meta.client) {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        return { user: parsed.user || null, token: parsed.token || null }
      }
    } catch {
      // ignore
    }
  }
  return { user: null, token: null }
}

function saveSession(user: AuthUser, token: string) {
  if (import.meta.client) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ user, token }))
  }
}

function clearSession() {
  if (import.meta.client) {
    localStorage.removeItem(STORAGE_KEY)
  }
}

export const useAuthStore = defineStore('auth', {
  state: () => {
    const session = loadSession()
    return {
      user: session.user as AuthUser | null,
      token: session.token as string | null
    }
  },

  getters: {
    isAuthenticated: state => !!state.token
  },

  actions: {
    async login(email: string, senha: string) {
      const { $api } = useNuxtApp()
      const response = await $api<ApiResponse<LoginResponse>>('/auth/login', {
        method: 'POST',
        body: { email, senha }
      })

      if (response.success) {
        this.token = response.data.token
        this.user = response.data.usuario
        saveSession(response.data.usuario, response.data.token)
      }

      return response
    },

    logout() {
      this.token = null
      this.user = null
      clearSession()
    },

    init() {
      const session = loadSession()
      this.user = session.user
      this.token = session.token
    }
  }
})
