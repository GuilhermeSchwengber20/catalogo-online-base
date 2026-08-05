<template>
  <UCarousel
    :items="banners"
    :ui="{ item: 'basis-full' }"
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
        <NuxtImg
          :src="item.imagem"
          :alt="item.titulo || 'Banner'"
          width="800"
          height="450"
          format="webp"
          class="w-full h-full object-cover"
          fetchpriority="high"
        />
      </NuxtLink>

      <div
        v-else
        class="w-full aspect-[16/9] sm:aspect-[21/9] overflow-hidden"
      >
        <NuxtImg
          :src="item.imagem"
          :alt="item.titulo || 'Banner'"
          width="800"
          height="450"
          format="webp"
          class="w-full h-full object-cover"
          fetchpriority="high"
        />
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
