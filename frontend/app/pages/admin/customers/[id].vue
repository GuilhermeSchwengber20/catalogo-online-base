<template>
  <div>
    <AdminPageHeader title="Detalhes do Cliente">
      <template #actions>
        <UButton
          color="neutral"
          variant="outline"
          @click="navigateTo('/admin/customers')"
        >
          Voltar
        </UButton>
      </template>
    </AdminPageHeader>

    <template v-if="loading">
      <UCard>
        <div class="flex flex-col gap-4">
          <USkeleton class="h-6 w-48 rounded" />
          <USkeleton class="h-40 w-full rounded" />
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

    <template v-else-if="customer">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-1 flex flex-col gap-6">
          <UCard>
            <template #header>
              <h2 class="font-semibold text-warm-900">
                Dados do Cliente
              </h2>
            </template>

            <div class="flex flex-col gap-4">
              <UFormField label="Nome">
                <UInput
                  v-model="form.nome"
                  class="w-full"
                />
              </UFormField>

              <UFormField label="Telefone">
                <UInput
                  v-model="form.telefone"
                  class="w-full"
                />
              </UFormField>

              <UFormField label="Email">
                <UInput
                  v-model="form.email"
                  type="email"
                  class="w-full"
                />
              </UFormField>

              <UFormField label="Cidade">
                <UInput
                  v-model="form.cidade"
                  class="w-full"
                />
              </UFormField>

              <UButton
                color="primary"
                variant="solid"
                class="w-full justify-center"
                :loading="saving"
                @click="saveCustomer"
              >
                Salvar
              </UButton>

              <p
                v-if="saveMsg"
                class="text-sm text-center"
                :class="saveMsg.includes('sucesso') ? 'text-success' : 'text-error'"
              >
                {{ saveMsg }}
              </p>
            </div>
          </UCard>
        </div>

        <div class="lg:col-span-2 flex flex-col gap-6">
          <UCard>
            <template #header>
              <h2 class="font-semibold text-warm-900">
                Histórico de Pedidos
              </h2>
            </template>

            <UTable
              :columns="orderColumns"
              :data="orders"
            >
              <template #status-cell="{ row }">
                <UBadge
                  :color="orderStatusColor((row.original as unknown as Order).status)"
                  variant="subtle"
                  size="sm"
                >
                  {{ orderStatusLabel((row.original as unknown as Order).status) }}
                </UBadge>
              </template>

              <template #total-cell="{ row }">
                {{ formatCurrency((row.original as unknown as Order).total) }}
              </template>

              <template #empty>
                <p class="text-sm text-warm-500 py-4 text-center">
                  Nenhum pedido encontrado para este cliente.
                </p>
              </template>
            </UTable>
          </UCard>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { Customer } from '~/types/customer'
import type { Order } from '~/types/order'
import { CustomerService } from '~/services/CustomerService'

definePageMeta({
  layout: 'admin'
})

const route = useRoute()
const id = computed(() => route.params.id as string)

const customer = ref<Customer | null>(null)
const orders = ref<Order[]>([])
const loading = ref(true)
const errorMsg = ref('')
const saving = ref(false)
const saveMsg = ref('')

const form = reactive({
  nome: '',
  telefone: '',
  email: '',
  cidade: ''
})

const orderColumns = [
  { accessorKey: 'createdAt', header: 'Data' },
  { id: 'status', header: 'Status' },
  { id: 'total', header: 'Total' }
]

type StatusColor = 'warning' | 'info' | 'neutral' | 'success' | 'error'

function orderStatusColor(status: string): StatusColor {
  const colors: Record<string, StatusColor> = {
    ABERTO: 'warning',
    EM_COMPRA: 'info',
    AGUARDANDO_CLIENTE: 'neutral',
    CONCLUIDO: 'success',
    CANCELADO: 'error'
  }
  return colors[status] || 'neutral'
}

function orderStatusLabel(status: string) {
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
    const response = await CustomerService.getById(id.value)
    if (response.success) {
      customer.value = response.data
      form.nome = response.data.nome
      form.telefone = response.data.telefone
      form.email = response.data.email || ''
      form.cidade = response.data.cidade || ''
    } else {
      errorMsg.value = 'Cliente não encontrado'
    }

    const ordersResponse = await CustomerService.getOrders(id.value)
    if (ordersResponse.success) {
      orders.value = ordersResponse.data.pedidos || []
    }
  } catch {
    errorMsg.value = 'Erro ao carregar dados do cliente'
  } finally {
    loading.value = false
  }
})

async function saveCustomer() {
  saving.value = true
  saveMsg.value = ''

  try {
    const response = await CustomerService.update(id.value, {
      nome: form.nome,
      telefone: form.telefone,
      email: form.email || undefined,
      cidade: form.cidade || undefined
    })

    if (response.success) {
      saveMsg.value = 'Dados atualizados com sucesso'
      customer.value = response.data
    } else {
      saveMsg.value = 'Erro ao atualizar dados'
    }
  } catch {
    saveMsg.value = 'Erro ao conectar com o servidor'
  } finally {
    saving.value = false
  }
}
</script>
