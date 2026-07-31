<template>
  <div>
    <AdminPageHeader title="Pedidos" />

    <AdminFilters>
      <USelect
        v-model="statusFilter"
        :items="statusOptions"
        placeholder="Todos os status"
        class="w-full sm:w-48"
        @update:model-value="onStatusChange"
      />
    </AdminFilters>
    <UCard>
      <UTable
        :columns="columns"
        :data="orders"
        :loading="loading"
      >
        <template #createdAt-cell="{ row }">
          {{ formatDate(row.original.createdAt) }}
        </template>
        <template #status-cell="{ row }">
          <UBadge
            :color="statusColor((row.original as unknown as Order).status)"
            variant="subtle"
            size="sm"
          >
            {{ statusLabel((row.original as unknown as Order).status) }}
          </UBadge>
        </template>

        <template #origem-cell="{ row }">
          <span class="text-sm text-warm-600">
            {{ (row.original as unknown as Order).origem === 'CATALOGO' ? 'Catálogo' : 'Manual' }}
          </span>
        </template>

        <template #acoes-cell="{ row }">
          <UButton
            icon="i-lucide-eye"
            size="sm"
            color="neutral"
            variant="ghost"
            @click="navigateTo(`/admin/orders/${(row.original as unknown as Order).id}`)"
          />
        </template>

        <template #empty>
          <div class="flex flex-col items-center justify-center py-12">
            <UIcon
              name="i-lucide-inbox"
              class="w-10 h-10 text-warm-300 mb-3"
            />
            <p class="text-sm text-warm-500">
              Nenhum pedido encontrado.
            </p>
          </div>
        </template>
      </UTable>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import type { Order } from '~/types/order'

definePageMeta({
  layout: 'admin'
})

const { orders, loading, fetchOrders } = useAdminOrders()

const statusFilter = ref('')

const statusOptions = [
  { label: 'Todos os status', value: 'ALL' },
  { label: 'Aberto', value: 'ABERTO' },
  { label: 'Em Compra', value: 'EM_COMPRA' },
  { label: 'Aguardando Cliente', value: 'AGUARDANDO_CLIENTE' },
  { label: 'Concluído', value: 'CONCLUIDO' },
  { label: 'Cancelado', value: 'CANCELADO' }
]

const columns = [
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'createdAt', header: 'Data' },
  { id: 'status', header: 'Status' },
  { id: 'origem', header: 'Origem' },
  { accessorKey: 'total', header: 'Total' },
  { id: 'acoes', header: '' }
]

function onStatusChange(value: string) {
  statusFilter.value = value
  fetchOrders(value ? { status: value } : undefined)
}

function statusColor(status: string) {
  const colors: Record<string, 'warning' | 'info' | 'neutral' | 'success' | 'error'> = {
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

onMounted(() => {
  fetchOrders()
})
</script>
