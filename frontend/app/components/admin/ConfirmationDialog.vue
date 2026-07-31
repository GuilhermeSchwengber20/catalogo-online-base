<script setup lang="ts">
withDefaults(defineProps<{
  title?: string
  description?: string
  confirmationLabel?: string
}>(), {
  title: 'Confirmar ação',
  description: 'Tem certeza que deseja realizar esta ação?',
  confirmationLabel: 'Confirmar'
})

const emit = defineEmits<{
  close: [boolean]
}>()
</script>

<template>
  <UModal
    :title="title"
    :description="description"
  >
    <template #footer>
      <div class="flex justify-end gap-3">
        <UButton
          color="neutral"
          variant="outline"
          @click="emit('close', false)"
        >
          Cancelar
        </UButton>

        <UButton
          color="error"
          @click="emit('close', true)"
        >
          {{ confirmationLabel }}
        </UButton>
      </div>
    </template>
  </UModal>
</template>
