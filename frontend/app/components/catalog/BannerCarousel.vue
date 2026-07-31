<template>
  <UCarousel
    :items="banners"
    :ui="{ item: 'basis-full' }"
    arrows
    indicators
    autoplay
    class="w-full"
  >
    <template #default="{ item }">
      <NuxtLink
        v-if="item.link"
        :to="item.link"
        class="block w-full aspect-[16/9] sm:aspect-[21/9] overflow-hidden"
      >
        <img
          :src="item.imagem"
          :alt="item.titulo || 'Banner'"
          class="w-full h-full object-cover"
          loading="lazy"
        >
      </NuxtLink>

      <div
        v-else
        class="w-full aspect-[16/9] sm:aspect-[21/9] overflow-hidden"
      >
        <img
          :src="item.imagem"
          :alt="item.titulo || 'Banner'"
          class="w-full h-full object-cover"
          loading="lazy"
        >
      </div>
    </template>
  </UCarousel>
</template>

<script setup lang="ts">
import type { Banner } from '~/types/banner'

defineProps<{
  banners: Banner[]
}>()
</script>
