<template>
  <div>
    <AdminPageHeader title="Detalhes do Pedido">
      <template #actions>
        <UButton
          color="neutral"
          variant="outline"
          @click="navigateTo('/admin/orders')"
        >
          Voltar
        </UButton>
      </template>
    </AdminPageHeader>

    <template v-if="loading">
      <UCard>
        <div class="flex flex-col gap-4">
          <USkeleton class="h-6 w-48 rounded" />
          <USkeleton class="h-20 w-full rounded" />
          <USkeleton class="h-32 w-full rounded" />
        </div>
      </UCard>
    </template>

    <template v-else-if="errorMsg">
      <UAlert
        color="error"
        variant="subtle"
        :title="errorMsg"
      />
    </template>

    <template v-else-if="order">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2 flex flex-col gap-6">
          <UCard>
            <template #header>
              <div class="flex items-center justify-between">
                <h2 class="font-semibold text-warm-900">
                  Itens do Pedido
                </h2>
                <UBadge
                  :color="statusColor(order.status)"
                  variant="subtle"
                >
                  {{ statusLabel(order.status) }}
                </UBadge>
              </div>
            </template>

            <UTable
              :columns="itemColumns"
              :data="order.itens || []"
            >
              <template #empty>
                <p class="text-sm text-warm-500 py-4 text-center">
                  Nenhum item neste pedido.
                </p>
              </template>
            </UTable>
          </UCard>

          <UCard>
            <template #header>
              <h2 class="font-semibold text-warm-900">
                Observações
              </h2>
            </template>

            <div class="flex flex-col gap-4">
              <div>
                <span class="text-xs text-warm-500 uppercase tracking-wide">Cliente</span>
                <p class="text-sm text-warm-700 mt-1">
                  {{ order.observacaoCliente || 'Nenhuma observação' }}
                </p>
              </div>

              <div>
                <span class="text-xs text-warm-500 uppercase tracking-wide">Interna (admin)</span>
                <p class="text-sm text-warm-700 mt-1">
                  {{ order.observacaoInterna || 'Nenhuma observação interna' }}
                </p>
              </div>
            </div>
          </UCard>
        </div>

        <div class="flex flex-col gap-6">
          <UCard>
            <template #header>
              <h2 class="font-semibold text-warm-900">
                Cliente
              </h2>
            </template>

            <div
              v-if="order.cliente"
              class="flex flex-col gap-3"
            >
              <div>
                <span class="text-xs text-warm-500 uppercase tracking-wide">Nome</span>
                <p class="text-sm text-warm-700">
                  {{ order.cliente.nome }}
                </p>
              </div>
              <div>
                <span class="text-xs text-warm-500 uppercase tracking-wide">Telefone</span>
                <p class="text-sm text-warm-700">
                  {{ order.cliente.telefone }}
                </p>
              </div>
              <div v-if="order.cliente.email">
                <span class="text-xs text-warm-500 uppercase tracking-wide">Email</span>
                <p class="text-sm text-warm-700">
                  {{ order.cliente.email }}
                </p>
              </div>
              <div v-if="order.cliente.cidade">
                <span class="text-xs text-warm-500 uppercase tracking-wide">Cidade</span>
                <p class="text-sm text-warm-700">
                  {{ order.cliente.cidade }}
                </p>
              </div>
            </div>
          </UCard>

          <UCard>
            <template #header>
              <h2 class="font-semibold text-warm-900">
                Status
              </h2>
            </template>

            <div class="flex flex-col gap-3">
              <div class="flex items-center justify-between">
                <span class="text-sm text-warm-500">Atual</span>
                <UBadge
                  :color="statusColor(order.status)"
                  variant="subtle"
                >
                  {{ statusLabel(order.status) }}
                </UBadge>
              </div>

              <USeparator />

              <div class="flex flex-col gap-2">
                <span class="text-xs text-warm-500 uppercase tracking-wide">Alterar para</span>

                <UButton
                  v-for="next in nextStatuses(order.status)"
                  :key="next.value"
                  size="sm"
                  :color="next.color"
                  variant="solid"
                  class="w-full justify-center"
                  :loading="statusChanging"
                  @click="changeStatus(next.value)"
                >
                  {{ next.label }}
                </UButton>

                <p
                  v-if="isTerminal(order.status)"
                  class="text-xs text-warm-400 text-center pt-2"
                >
                  Status terminal. Não é possível alterar.
                </p>
              </div>
            </div>
          </UCard>

          <UCard>
            <template #header>
              <h2 class="font-semibold text-warm-900">
                Resumo
              </h2>
            </template>

            <div class="flex flex-col gap-2">
              <div class="flex justify-between text-sm">
                <span class="text-warm-500">Subtotal</span>
                <span class="text-warm-700">{{ formatCurrency(order.subtotal) }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-warm-500">Desconto</span>
                <span class="text-warm-700">{{ formatCurrency(order.desconto) }}</span>
              </div>
              <USeparator />
              <div class="flex justify-between font-semibold">
                <span class="text-warm-900">Total</span>
                <span class="text-warm-900">{{ formatCurrency(order.total) }}</span>
              </div>
              <div class="text-xs text-warm-400 mt-2">
                {{ order.origem === 'CATALOGO' ? 'Pedido via Catálogo' : 'Pedido Manual' }}
              </div>
            </div>
          </UCard>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})

const route = useRoute()
const id = computed(() => route.params.id as string)

const { currentOrder, loading, error: storeError, fetchOrder, updateStatus } = useAdminOrders()

const errorMsg = ref('')
const statusChanging = ref(false)

const order = computed(() => currentOrder.value)

const itemColumns = [
  { accessorKey: 'nomeProduto', header: 'Produto' },
  { accessorKey: 'quantidade', header: 'Qtd' },
  { accessorKey: 'precoUnitario', header: 'Preço Unit.' },
  { accessorKey: 'subtotal', header: 'Subtotal' }
]

watch(storeError, (val) => {
  if (val) errorMsg.value = val
})

onMounted(() => {
  fetchOrder(id.value)
})

type StatusColor = 'warning' | 'info' | 'neutral' | 'success' | 'error'

function statusColor(status: string): StatusColor {
  const colors: Record<string, StatusColor> = {
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

function isTerminal(status: string): boolean {
  return status === 'CONCLUIDO' || status === 'CANCELADO'
}

function nextStatuses(status: string): Array<{ value: string, label: string, color: StatusColor }> {
  const transitions: Record<string, Array<{ value: string, label: string, color: StatusColor }>> = {
    ABERTO: [
      { value: 'EM_COMPRA', label: 'Em Compra', color: 'info' },
      { value: 'CANCELADO', label: 'Cancelar Pedido', color: 'error' }
    ],
    EM_COMPRA: [
      { value: 'AGUARDANDO_CLIENTE', label: 'Aguardando Cliente', color: 'neutral' }
    ],
    AGUARDANDO_CLIENTE: [
      { value: 'CONCLUIDO', label: 'Concluir Pedido', color: 'success' }
    ]
  }
  return transitions[status] || []
}

async function changeStatus(newStatus: string) {
  statusChanging.value = true
  errorMsg.value = ''
  const success = await updateStatus(id.value, newStatus)
  if (!success) {
    errorMsg.value = storeError.value || 'Erro ao alterar status'
  }
  statusChanging.value = false
}
</script>
