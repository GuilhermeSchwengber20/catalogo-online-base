<template>
  <div class="flex flex-col items-center justify-center gap-4 py-16 px-4">
    <UIcon
      name="i-lucide-package-open"
      class="w-12 h-12 text-warm-300"
    />
    <p class="text-warm-500 text-center">
      {{ message }}
    </p>
    <slot name="action" />
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  message?: string
}>(), {
  message: 'Nenhum produto disponível no momento.'
})
</script>
