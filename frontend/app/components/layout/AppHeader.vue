<template>
  <UHeader
    :toggle="false"
  >
    <template #left>
      <UButton
        icon="i-lucide-menu"
        variant="ghost"
        color="neutral"
        class="lg:hidden"
        @click="$emit('toggle-menu')"
      />

      <NuxtLink
        to="/"
        class="font-semibold text-lg shrink-0 text-rose-400"
      >
        {{ settings?.nomeLoja || 'Donna Decor Importados' }}
      </NuxtLink>
    </template>

    <template #right>
      <CatalogSearchBar
        v-if="showSearch"
        v-model="searchQuery"
        class="hidden lg:flex max-w-xs"
      />

      <UButton
        icon="i-lucide-search"
        variant="ghost"
        color="neutral"
        class="lg:hidden"
        @click="$emit('toggle-search')"
      />

      <div class="relative inline-flex items-center">
        <UButton
          icon="i-lucide-shopping-cart"
          variant="ghost"
          color="neutral"
          aria-label="Abrir carrinho"
          @click="$emit('toggle-cart')"
        />

        <span
          v-if="cartTotal > 0"
          class="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center leading-none"
        >
          {{ cartTotal > 99 ? '99+' : cartTotal }}
        </span>
      </div>
    </template>
  </UHeader>
</template>

<script setup lang="ts">
const { settings } = useCatalogSettings()
defineProps<{
  showSearch?: boolean
  cartTotal: number
}>()

defineEmits<{
  'toggle-menu': []
  'toggle-search': []
  'toggle-cart': []
}>()

const searchQuery = defineModel<string>('searchQuery', { default: '' })
</script>
