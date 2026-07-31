<template>
  <div class="flex flex-col gap-0.5">
    <span
      v-if="promotionalPrice && promotionalPrice !== price"
      class="text-sm text-warm-400 line-through"
    >
      {{ formatCurrency(price) }}
    </span>

    <span class="font-semibold text-warm-900">
      {{ formatCurrency(promotionalPrice || price) }}
    </span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  price: number
  promotionalPrice?: number | null
}>()
</script>
