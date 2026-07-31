<template>
  <div class="flex flex-col gap-3">
    <div class="relative aspect-square overflow-hidden bg-warm-100 rounded-xl">
      <img
        v-for="(image, index) in images"
        :key="image.id"
        :src="image.url"
        :alt="alt"
        class="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
        :class="index === currentIndex ? 'opacity-100' : 'opacity-0'"
        loading="lazy"
      >

      <button
        v-if="images.length > 1"
        class="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center shadow-sm hover:bg-white transition-colors"
        @click="prev"
      >
        <UIcon
          name="i-lucide-chevron-left"
          class="w-4 h-4 text-warm-700"
        />
      </button>

      <button
        v-if="images.length > 1"
        class="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center shadow-sm hover:bg-white transition-colors"
        @click="next"
      >
        <UIcon
          name="i-lucide-chevron-right"
          class="w-4 h-4 text-warm-700"
        />
      </button>

      <div
        v-if="images.length > 1"
        class="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5"
      >
        <button
          v-for="(image, index) in images"
          :key="image.id"
          class="w-2 h-2 rounded-full transition-all"
          :class="index === currentIndex ? 'bg-white w-4' : 'bg-white/50'"
          @click="currentIndex = index"
        />
      </div>
    </div>

    <div
      v-if="images.length > 1"
      class="flex gap-2 overflow-x-auto pb-1"
    >
      <button
        v-for="(image, index) in images"
        :key="image.id"
        class="w-16 h-16 rounded-lg overflow-hidden shrink-0 border-2 transition-colors"
        :class="index === currentIndex ? 'border-primary' : 'border-transparent hover:border-warm-300'"
        @click="currentIndex = index"
      >
        <img
          :src="image.url"
          :alt="`${alt} ${index + 1}`"
          class="w-full h-full object-cover"
          loading="lazy"
        >
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProductImage } from '~/types/product'

const props = defineProps<{
  images: ProductImage[]
  alt?: string
}>()

const currentIndex = ref(0)

function prev() {
  if (currentIndex.value > 0) {
    currentIndex.value--
  } else {
    currentIndex.value = props.images.length - 1
  }
}

function next() {
  if (currentIndex.value < props.images.length - 1) {
    currentIndex.value++
  } else {
    currentIndex.value = 0
  }
}

watch(
  () => props.images.length,
  () => {
    currentIndex.value = 0
  }
)
</script>
