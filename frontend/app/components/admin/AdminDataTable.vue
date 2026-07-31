<template>
  <UCard>
    <UTable
      :columns="columns"
      :rows="rows"
      :loading="loading"
    >
      <slot name="ativo-cell" />
      <slot name="acoes-cell" />

      <template #empty>
        <div class="flex flex-col items-center justify-center py-12">
          <UIcon
            name="i-lucide-inbox"
            class="w-10 h-10 text-warm-300 mb-3"
          />
          <p class="text-sm text-warm-500">
            Nenhum registro encontrado.
          </p>
        </div>
      </template>
    </UTable>
  </UCard>
</template>

<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/no-explicit-any
defineProps<{ columns: any[], rows: any[], loading?: boolean }>()
</script>
