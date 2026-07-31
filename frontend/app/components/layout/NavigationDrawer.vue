<template>
  <UDrawer
    :open="open"
    title="Menu"
    @close="$emit('close')"
  >
    <template #body>
      <nav class="flex flex-col gap-1">
        <NuxtLink
          to="/"
          class="flex items-center gap-3 px-3 py-2 rounded-lg text-warm-700 hover:bg-warm-100 transition-colors"
          @click="$emit('close')"
        >
          <UIcon
            name="i-lucide-home"
            class="w-5 h-5"
          />
          <span>Início</span>
        </NuxtLink>

        <NuxtLink
          to="/cart"
          class="flex items-center gap-3 px-3 py-2 rounded-lg text-warm-700 hover:bg-warm-100 transition-colors"
          @click="$emit('close')"
        >
          <UIcon
            name="i-lucide-shopping-cart"
            class="w-5 h-5"
          />
          <span>Carrinho</span>
          <UBadge
            v-if="cartTotal > 0"
            size="sm"
            color="primary"
            class="ml-auto"
          >
            {{ cartTotal }}
          </UBadge>
        </NuxtLink>
      </nav>
    </template>
  </UDrawer>
</template>

<script setup lang="ts">
defineProps<{
  open: boolean
  cartTotal: number
}>()

defineEmits<{
  close: []
}>()
</script>
