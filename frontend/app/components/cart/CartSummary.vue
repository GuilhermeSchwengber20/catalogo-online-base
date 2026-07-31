<template>
  <div class="flex flex-col gap-4 p-4 bg-warm-50 rounded-xl">
    <div class="flex items-center justify-between">
      <span class="text-sm text-warm-500">Subtotal</span>
      <span class="font-semibold text-warm-900">{{ formatCurrency(subtotal) }}</span>
    </div>

    <p class="text-xs text-warm-400 text-center">
      O total final será informado no WhatsApp após o processamento do pedido.
    </p>

    <UButton
      size="lg"
      color="primary"
      variant="solid"
      class="w-full justify-center gap-2"
      :disabled="!hasItems"
      @click="$emit('checkout')"
    >
      <UIcon
        name="i-lucide-shopping-cart"
        class="w-5 h-5"
      />
      Finalizar Pedido
    </UButton>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  subtotal: string
  hasItems: boolean
}>()

defineEmits<{
  checkout: []
}>()
</script>
