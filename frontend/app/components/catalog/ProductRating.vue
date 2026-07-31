<template>
  <div class="flex items-center gap-1">
    <UIcon
      v-for="i in 5"
      :key="i"
      :name="i <= stars ? 'i-lucide-star' : 'i-lucide-star'"
      :class="[
        'w-4 h-4',
        i <= stars ? 'text-gold-500' : 'text-warm-200'
      ]"
    />
    <span class="text-xs text-warm-400 ml-1">
      {{ stars }},0
    </span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue?: number
}>()

const stars = computed(() => {
  return props.modelValue || Math.floor(Math.random() * 2) + 4
})
</script>
