<script setup lang="ts">
import type { InputNumberProps } from '@nuxt/ui'

const model = defineModel<number | null>()

const props = defineProps<Omit<InputNumberProps, 'modelValue'>>()
</script>

<template>
  <!--
    step e step-snapping parar o arredondamento exemplo 220,90 não virar 221
    increment e decrement - desativar os botoes de incrementação e decrementação
    format-options opções para formatar o campo
  -->
  <UInputNumber
    v-bind="props"
    v-model="model"
    locale="pt-BR"
    :step="0.01"
    :step-snapping="false"
    :increment="false"
    :decrement="false"
    :format-options="{
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      ...(props.formatOptions ?? {})
    }"
  />
</template>
