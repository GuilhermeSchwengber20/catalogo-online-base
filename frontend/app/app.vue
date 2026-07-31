<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup lang="ts">
const { fetchSettings } = useCatalogSettings()

await fetchSettings();
</script>
