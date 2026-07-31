<template>
  <UApp>
    <div class="flex h-screen overflow-hidden bg-(--ui-bg)">
      <AdminSidebar
        :open="sidebarOpen"
        @close="sidebarOpen = false"
      />

      <div class="flex min-w-0 flex-1 flex-col">
        <AdminHeader
          :breadcrumb="breadcrumb"
          @toggle-sidebar="sidebarOpen = !sidebarOpen"
        />

        <main class="flex-1 overflow-y-auto py-6 lg:py-8">
          <UContainer>
            <slot />
          </UContainer>
        </main>
      </div>
    </div>
  </UApp>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

definePageMeta({
  middleware: 'admin'
})

const route = useRoute()
const sidebarOpen = ref(false)

const breadcrumb = computed(() => {
  const segments = route.path.split('/').filter(Boolean)

  const items: Array<{ label: string, to?: string }> = [
    { label: 'Início', to: '/admin' }
  ]

  if (segments.length > 1) {
    const segment = segments[1]!
    const label = segment.charAt(0).toUpperCase() + segment.slice(1)

    if (segments.length > 2) {
      items.push({ label, to: `/admin/${segment}` })
      const action = segments[2]!
      items.push({ label: action === 'new' ? 'Novo' : 'Editar' })
    } else {
      items.push({ label })
    }
  }

  return items
})
</script>
