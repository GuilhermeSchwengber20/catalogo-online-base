<template>
  <div
    v-if="$slots.default"
    class="flex flex-wrap items-center gap-3 mb-4"
  >
    <slot />
  </div>
</template>
