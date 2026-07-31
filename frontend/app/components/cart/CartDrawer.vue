<template>
  <UDrawer
    :open="open"
    title="Carrinho"
    @close="$emit('close')"
  >
    <template #body>
      <div class="flex flex-col gap-4">
        <div v-if="items.length">
          <div class="flex flex-col divide-y divide-warm-100">
            <div
              v-for="item in items"
              :key="item.product.id"
              class="flex gap-3 py-3"
            >
              <NuxtLink
                :to="`/product/${item.product.slug}`"
                class="w-14 h-14 rounded-lg overflow-hidden bg-warm-100 shrink-0"
                @click="$emit('close')"
              >
                <img
                  :src="item.product.imagens?.[0]?.url || '/placeholder.svg'"
                  :alt="item.product.nome"
                  class="w-full h-full object-cover"
                  loading="lazy"
                >
              </NuxtLink>

              <div class="flex flex-col gap-1 flex-1 min-w-0">
                <span class="text-sm text-warm-900 line-clamp-1">
                  {{ item.product.nome }}
                </span>

                <div class="flex items-center justify-between">
                  <CatalogProductPrice
                    :price="item.product.preco"
                    :promotional-price="item.product.precoPromocional"
                  />

                  <span class="text-sm text-warm-400">
                    x{{ item.quantity }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          v-else
          class="flex flex-col items-center justify-center gap-4 py-12"
        >
          <UIcon
            name="i-lucide-shopping-cart"
            class="w-10 h-10 text-warm-300"
          />
          <p class="text-sm text-warm-500">
            Seu carrinho está vazio
          </p>
        </div>

        <div class="p-4 bg-gradient-to-br from-rose-50 to-gold-50 rounded-xl border border-rose-200">
          <div class="flex items-start gap-3">
            <div class="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center shrink-0">
              <UIcon
                name="i-lucide-message-circle"
                class="w-5 h-5 text-white"
              />
            </div>

            <div class="flex flex-col gap-1">
              <span class="font-semibold text-sm text-warm-900">
                Fique por dentro das novidades!
              </span>
              <p class="text-xs text-warm-500 leading-relaxed">
                Entre no nosso grupo do WhatsApp e receba promoções exclusivas, lançamentos e ofertas especiais em primeira mão.
              </p>
              <UButton
                size="xs"
                color="success"
                variant="solid"
                class="mt-2 self-start gap-1.5"
                to="https://wa.me/5511999999999"
                target="_blank"
              >
                <UIcon
                  name="i-lucide-message-circle"
                  class="w-4 h-4"
                />
                Entrar no Grupo
              </UButton>
            </div>
          </div>
        </div>

        <div class="text-center">
          <UButton
            variant="ghost"
            color="neutral"
            size="sm"
            to="/"
            @click="$emit('close')"
          >
            <UIcon
              name="i-lucide-arrow-left"
              class="w-4 h-4"
            />
            Continuar comprando
          </UButton>
        </div>
      </div>
    </template>

    <template
      v-if="items.length"
      #footer
    >
      <div class="flex flex-col gap-3">
        <div class="flex items-center justify-between">
          <span class="text-sm text-warm-500">Subtotal</span>
          <span class="font-semibold text-warm-900">
            {{ formatCurrency(subtotal) }}
          </span>
        </div>

        <UButton
          color="primary"
          variant="solid"
          class="w-full justify-center gap-2"
          @click="$emit('checkout')"
        >
          <UIcon
            name="i-lucide-shopping-cart"
            class="w-5 h-5"
          />
          Finalizar Pedido
        </UButton>
      </div>
    </template>
  </UDrawer>
</template>

<script setup lang="ts">
import type { CartItem } from '~/types/cart'

defineProps<{
  open: boolean
  items: CartItem[]
  subtotal: string
}>()

defineEmits<{
  close: []
  checkout: []
}>()
</script>
