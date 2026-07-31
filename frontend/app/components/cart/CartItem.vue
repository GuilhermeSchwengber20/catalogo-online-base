<template>
  <div class="flex gap-4 py-4 border-b border-warm-200 last:border-b-0">
    <NuxtLink
      :to="`/product/${item.product.slug}`"
      class="w-20 h-20 rounded-lg overflow-hidden bg-warm-100 shrink-0"
    >
      <img
        :src="item.product.imagens?.[0]?.url || '/placeholder.svg'"
        :alt="item.product.nome"
        class="w-full h-full object-cover"
        loading="lazy"
      >
    </NuxtLink>

    <div class="flex flex-col gap-2 flex-1 min-w-0">
      <NuxtLink
        :to="`/product/${item.product.slug}`"
        class="text-sm font-medium text-warm-900 line-clamp-2 hover:underline"
      >
        {{ item.product.nome }}
      </NuxtLink>

      <CatalogProductPrice
        :price="item.product.preco"
        :promotional-price="item.product.precoPromocional"
      />

      <div class="flex items-center justify-between mt-auto">
        <CartQuantitySelector
          :model-value="item.quantity"
          :max="item.product.estoque"
          @update:model-value="$emit('update-quantity', item.product.id, $event)"
        />

        <UButton
          icon="i-lucide-trash-2"
          size="sm"
          color="error"
          variant="ghost"
          @click="$emit('remove', item.product.id)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CartItem } from '~/types/cart'

defineProps<{
  item: CartItem
}>()

defineEmits<{
  'update-quantity': [productId: string, quantity: number]
  'remove': [productId: string]
}>()
</script>
