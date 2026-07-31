<template>
  <UInput
    :model-value="modelValue"
    placeholder="Buscar produtos..."
    icon="i-lucide-search"
    class="w-full"
    @update:model-value="$emit('update:modelValue', $event)"
  />
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string
}>()

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>
