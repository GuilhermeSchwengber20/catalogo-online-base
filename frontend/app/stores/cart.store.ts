import { defineStore } from 'pinia'
import type { CartItem } from '~/types/cart'
import type { Product } from '~/types/product'

const CART_STORAGE_KEY = 'dona-decor-cart'

function loadCart(): CartItem[] {
  if (import.meta.client) {
    const stored = localStorage.getItem(CART_STORAGE_KEY)
    if (stored) {
      try {
        return JSON.parse(stored) as CartItem[]
      } catch {
        return []
      }
    }
  }
  return []
}

function saveCart(items: CartItem[]) {
  if (import.meta.client) {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
  }
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: loadCart() as CartItem[],
    observations: '' as string
  }),

  getters: {
    totalItems: state => state.items.reduce((sum, item) => sum + item.quantity, 0),

    subtotal: (state) => {
      const total = state.items.reduce((sum, item) => {
        const price = item.product.precoPromocional || item.product.preco
        return sum + price * item.quantity
      }, 0)
      return total.toFixed(2)
    },

    isEmpty: state => state.items.length === 0
  },

  actions: {
    addItem(product: Product, quantity = 1) {
      const existing = this.items.find(item => item.product.id === product.id)
      if (existing) {
        existing.quantity += quantity
      } else {
        this.items.push({ product, quantity })
      }
      saveCart(this.items)
    },

    updateQuantity(productId: string, quantity: number) {
      const item = this.items.find(item => item.product.id === productId)
      if (item) {
        if (quantity <= 0) {
          this.removeItem(productId)
          return
        }
        item.quantity = quantity
        saveCart(this.items)
      }
    },

    removeItem(productId: string) {
      this.items = this.items.filter(item => item.product.id !== productId)
      saveCart(this.items)
    },

    clearCart() {
      this.items = []
      this.observations = ''
      saveCart(this.items)
    }
  }
})
