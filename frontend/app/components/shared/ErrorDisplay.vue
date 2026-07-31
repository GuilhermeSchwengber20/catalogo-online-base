<template>
  <div class="flex flex-col items-center justify-center gap-4 py-16 px-4">
    <UIcon
      name="i-lucide-alert-circle"
      class="w-12 h-12 text-warm-300"
    />
    <p class="text-warm-500 text-center">
      {{ message }}
    </p>
    <UButton
      v-if="retryable"
      color="primary"
      variant="soft"
      @click="$emit('retry')"
    >
      Tentar novamente
    </UButton>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  message?: string
  retryable?: boolean
}>(), {
  message: 'Erro ao carregar dados. Tente novamente.'
})

defineEmits<{
  retry: []
}>()
</script>
