<template>
  <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
    <div class="w-full sm:max-w-xs">
      <UInput
        :model-value="search"
        placeholder="Buscar..."
        icon="i-lucide-search"
        class="w-full"
        @update:model-value="$emit('update:search', $event)"
      />
    </div>

    <div
      v-if="$slots.actions"
      class="flex items-center gap-2"
    >
      <slot name="actions" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  search?: string
}>()

defineEmits<{
  'update:search': [value: string]
}>()
</script>
