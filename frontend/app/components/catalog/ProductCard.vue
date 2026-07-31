<template>
  <div class="flex flex-col bg-white rounded-xl border border-warm-200 overflow-hidden">
    <NuxtLink
      :to="`/product/${slug}`"
      class="flex flex-col flex-1"
    >
      <div class="relative aspect-square overflow-hidden bg-warm-100">
        <img
          :src="image"
          :alt="name"
          class="w-full h-full object-cover"
          loading="lazy"
        >

        <CatalogPromotionBadge
          v-if="promotionalPrice"
          :price="price"
          :promotional-price="promotionalPrice"
        />
      </div>

      <div class="flex flex-col gap-2 p-3 flex-1">
        <span class="text-sm text-warm-700 line-clamp-2 leading-tight">
          {{ name }}
        </span>

        <CatalogProductPrice
          :price="price"
          :promotional-price="promotionalPrice"
        />
      </div>
    </NuxtLink>

    <div class="px-3 pb-3">
      <UButton
        size="sm"
        color="primary"
        variant="solid"
        class="w-full"
        @click.stop="$emit('add')"
      >
        Adicionar
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  name: string
  slug: string
  price: number
  promotionalPrice?: number | null
  image: string
}>()

defineEmits<{
  add: []
}>()
</script>
