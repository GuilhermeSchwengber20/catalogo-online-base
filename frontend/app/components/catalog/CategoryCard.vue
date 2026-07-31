<template>
  <NuxtLink
    :to="`/category/${slug}`"
    class="flex flex-col items-center gap-2 shrink-0 w-24 sm:w-28"
  >
    <div class="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-warm-100 overflow-hidden">
      <img
        v-if="image"
        :src="image"
        :alt="name"
        class="w-full h-full object-cover"
        loading="lazy"
      >
      <div
        v-else
        class="w-full h-full flex items-center justify-center text-warm-300"
      >
        <UIcon
          name="i-lucide-folder"
          class="w-8 h-8"
        />
      </div>
    </div>

    <span class="text-sm font-medium text-center text-warm-700 line-clamp-1">
      {{ name }}
    </span>
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
  name: string
  slug: string
  image?: string | null
}>()
</script>
