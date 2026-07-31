<template>
  <header class="flex items-center justify-between h-(--ui-header-height) px-4 lg:px-6 border-b border-default bg-default shrink-0">
    <div class="flex items-center gap-3 min-w-0">
      <UButton
        icon="i-lucide-menu"
        variant="ghost"
        color="neutral"
        class="lg:hidden"
        @click="$emit('toggle-sidebar')"
      />

      <UBreadcrumb
        :items="breadcrumb"
        class="min-w-0 truncate"
      />
    </div>

    <div class="flex items-center gap-2 shrink-0">
      <UDropdownMenu :items="userMenuItems">
        <UButton
          variant="ghost"
          color="neutral"
          class="gap-2"
        >
          <UAvatar
            :alt="userName"
            size="sm"
          />
          <span class="text-sm text-warm-700 hidden sm:block">{{ userName }}</span>
        </UButton>
      </UDropdownMenu>
    </div>
  </header>
</template>

<script setup lang="ts">
defineProps<{
  breadcrumb: Array<{ label: string, to?: string }>
}>()

defineEmits<{
  'toggle-sidebar': []
}>()

const authStore = useAuthStore()
const router = useRouter()

const userName = computed(() => authStore.user?.nome || 'Admin')

const userMenuItems = computed(() => [
  [
    {
      label: userName.value,
      icon: 'i-lucide-circle-user',
      disabled: true
    }
  ],
  [
    {
      label: 'Sair',
      icon: 'i-lucide-log-out',
      onSelect: () => {
        authStore.logout()
        router.push('/admin/login')
      }
    }
  ]
])
</script>
