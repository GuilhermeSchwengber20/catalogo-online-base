<template>
  <div>
    <AdminPageHeader
      title="Dashboard"
      description="Bem-vindo ao painel administrativo da Dona Decor Imports."
    />

    <template v-if="loading">
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <UCard
          v-for="i in 4"
          :key="i"
        >
          <div class="flex flex-col gap-2">
            <USkeleton class="h-4 w-20 rounded" />
            <USkeleton class="h-8 w-12 rounded" />
          </div>
        </UCard>
      </div>
    </template>

    <template v-else-if="errorMsg">
      <UAlert
        color="error"
        variant="subtle"
        :title="errorMsg"
        class="mb-6"
      />
    </template>

    <template v-else>
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <UCard>
          <div class="flex flex-col gap-1">
            <span class="text-xs text-warm-500 uppercase tracking-wide">Pedidos</span>
            <span class="text-2xl font-bold text-warm-900">{{ data?.pedidos.total || 0 }}</span>
          </div>
        </UCard>

        <UCard>
          <div class="flex flex-col gap-1">
            <span class="text-xs text-warm-500 uppercase tracking-wide">Clientes</span>
            <span class="text-2xl font-bold text-warm-900">{{ data?.clientes.total || 0 }}</span>
          </div>
        </UCard>

        <UCard>
          <div class="flex flex-col gap-1">
            <span class="text-xs text-warm-500 uppercase tracking-wide">Produtos</span>
            <span class="text-2xl font-bold text-warm-900">{{ data?.produtos.ativos || 0 }}</span>
            <span class="text-xs text-warm-400">
              {{ data?.produtos.inativos || 0 }} inativos
            </span>
          </div>
        </UCard>

        <UCard>
          <div class="flex flex-col gap-1">
            <span class="text-xs text-warm-500 uppercase tracking-wide">Estoque</span>
            <span class="text-2xl font-bold text-warm-900">{{ data?.estoque.total || 0 }}</span>
            <span
              v-if="(data?.estoque.baixo || 0) > 0"
              class="text-xs text-warning"
            >
              {{ data?.estoque.baixo }} com estoque baixo
            </span>
            <span
              v-if="(data?.estoque.semEstoque || 0) > 0"
              class="text-xs text-error"
            >
              {{ data?.estoque.semEstoque }} sem estoque
            </span>
          </div>
        </UCard>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UCard>
          <template #header>
            <h2 class="font-semibold text-warm-900">
              Pedidos por Status
            </h2>
          </template>

          <div
            v-if="statusEntries.length"
            class="flex flex-col gap-3"
          >
            <div
              v-for="[status, count] in statusEntries"
              :key="status"
              class="flex items-center justify-between"
            >
              <div class="flex items-center gap-2">
                <UBadge
                  :color="statusColor(status)"
                  variant="subtle"
                  size="sm"
                >
                  {{ statusLabel(status) }}
                </UBadge>
              </div>
              <span class="font-medium text-warm-900">{{ count }}</span>
            </div>
          </div>

          <p
            v-else
            class="text-sm text-warm-500 py-4 text-center"
          >
            Nenhum pedido cadastrado.
          </p>
        </UCard>

        <UCard>
          <template #header>
            <h2 class="font-semibold text-warm-900">
              Acesso Rápido
            </h2>
          </template>

          <div class="flex flex-col gap-2">
            <UButton
              color="primary"
              variant="soft"
              class="w-full justify-start gap-3"
              icon="i-lucide-tags"
              @click="navigateTo('/admin/categories')"
            >
              Gerenciar Categorias
            </UButton>

            <UButton
              color="primary"
              variant="soft"
              class="w-full justify-start gap-3"
              icon="i-lucide-package"
              @click="navigateTo('/admin/products')"
            >
              Gerenciar Produtos
            </UButton>

            <UButton
              color="primary"
              variant="soft"
              class="w-full justify-start gap-3"
              icon="i-lucide-shopping-cart"
              @click="navigateTo('/admin/orders')"
            >
              Ver Pedidos
            </UButton>

            <UButton
              color="primary"
              variant="soft"
              class="w-full justify-start gap-3"
              icon="i-lucide-settings"
              @click="navigateTo('/admin/settings')"
            >
              Configurações
            </UButton>
          </div>
        </UCard>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})

interface DashboardData {
  pedidos: { total: number, porStatus: Record<string, number> }
  clientes: { total: number }
  produtos: { total: number, ativos: number, inativos: number }
  estoque: { total: number, baixo: number, semEstoque: number }
}

const loading = ref(true)
const errorMsg = ref('')
const data = ref<DashboardData | null>(null)

const statusEntries = computed(() => {
  if (!data.value) return []
  return Object.entries(data.value.pedidos.porStatus)
})

type BadgeColor = 'warning' | 'info' | 'neutral' | 'success' | 'error'

function statusColor(status: string): BadgeColor {
  const colors: Record<string, BadgeColor> = {
    ABERTO: 'warning',
    EM_COMPRA: 'info',
    AGUARDANDO_CLIENTE: 'neutral',
    CONCLUIDO: 'success',
    CANCELADO: 'error'
  }
  return colors[status] || 'neutral'
}

function statusLabel(status: string) {
  const labels: Record<string, string> = {
    ABERTO: 'Aberto',
    EM_COMPRA: 'Em Compra',
    AGUARDANDO_CLIENTE: 'Aguardando',
    CONCLUIDO: 'Concluído',
    CANCELADO: 'Cancelado'
  }
  return labels[status] || status
}

onMounted(async () => {
  try {
    const { $api } = useNuxtApp()
    const response = await $api<{ success: boolean, data: DashboardData }>('/dashboard')
    if (response.success) {
      data.value = response.data
    }
  } catch (err: unknown) {
    errorMsg.value = err instanceof Error ? err.message : 'Erro ao carregar dashboard'
  } finally {
    loading.value = false
  }
})
</script>
