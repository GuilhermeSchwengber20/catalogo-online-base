<template>
  <UBadge
    v-if="percentage"
    size="sm"
    color="error"
    variant="solid"
    class="absolute top-2 left-2 z-10"
  >
    -{{ percentage }}%
  </UBadge>
</template>

<script setup lang="ts">
const props = defineProps<{
  price: number
  promotionalPrice: number
}>()

const percentage = computed(() => {
  const original = props.price
  const promo = props.promotionalPrice
  if (original <= 0 || promo <= 0 || promo >= original) {
    return null
  }
  return Math.round((1 - promo / original) * 100)
})
</script>
