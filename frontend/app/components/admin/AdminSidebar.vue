<template>
  <USidebar class="hidden lg:flex">
    <template #header>
      <NuxtLink
        to="/admin"
        class="flex items-center gap-3 px-3"
      >
        <span class="font-semibold text-lg text-rose-400">Dona Decor</span>
      </NuxtLink>
    </template>

    <UNavigationMenu
      :items="menuItems"
      orientation="vertical"
    />
  </USidebar>

  <USlideover
    :open="open"
    title="Menu"
    @close="$emit('close')"
  >
    <template #body>
      <UNavigationMenu
        :items="menuItems"
        orientation="vertical"
      />
    </template>
  </USlideover>
</template>

<script setup lang="ts">
defineProps<{
  open: boolean
}>()

defineEmits<{
  close: []
}>()

const route = useRoute()

const menuItems = computed(() => [
  {
    label: 'Dashboard',
    icon: 'i-lucide-layout-dashboard',
    to: '/admin',
    active: route.path === '/admin'
  },
  {
    label: 'Categorias',
    icon: 'i-lucide-tags',
    to: '/admin/categories',
    active: route.path.startsWith('/admin/categories')
  },
  {
    label: 'Produtos',
    icon: 'i-lucide-package',
    to: '/admin/products',
    active: route.path.startsWith('/admin/products')
  },
  {
    label: 'Pedidos',
    icon: 'i-lucide-shopping-cart',
    to: '/admin/orders',
    active: route.path.startsWith('/admin/orders')
  },
  {
    label: 'Clientes',
    icon: 'i-lucide-users',
    to: '/admin/customers',
    active: route.path.startsWith('/admin/customers')
  },
  {
    label: 'Banners',
    icon: 'i-lucide-image',
    to: '/admin/banners',
    active: route.path.startsWith('/admin/banners')
  },
  {
    label: 'Configurações',
    icon: 'i-lucide-settings',
    to: '/admin/settings',
    active: route.path.startsWith('/admin/settings')
  }
])
</script>
