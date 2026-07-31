<template>
  <div class="flex items-center gap-2">
    <UButton
      icon="i-lucide-minus"
      size="sm"
      color="neutral"
      variant="outline"
      :disabled="modelValue <= min"
      @click="decrement"
    />

    <span class="w-8 text-center font-medium text-sm tabular-nums">
      {{ modelValue }}
    </span>

    <UButton
      icon="i-lucide-plus"
      size="sm"
      color="neutral"
      variant="outline"
      :disabled="max !== null && modelValue >= max"
      @click="increment"
    />
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  modelValue: number
  min?: number
  max?: number | null
}>(), {
  min: 1,
  max: null
})

const emit = defineEmits<{
  'update:modelValue': [value: number]
}>()

function increment() {
  if (props.max !== null && props.modelValue >= props.max) return
  emit('update:modelValue', props.modelValue + 1)
}

function decrement() {
  if (props.modelValue <= props.min) return
  emit('update:modelValue', props.modelValue - 1)
}
</script>
