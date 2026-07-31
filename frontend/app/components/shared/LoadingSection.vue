<template>
  <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
    <div
      v-for="i in count"
      :key="i"
      class="flex flex-col gap-3"
    >
      <USkeleton class="aspect-square rounded-xl" />
      <USkeleton class="h-4 w-3/4 rounded" />
      <USkeleton class="h-4 w-1/2 rounded" />
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  count?: number
}>(), {
  count: 4
})
</script>
