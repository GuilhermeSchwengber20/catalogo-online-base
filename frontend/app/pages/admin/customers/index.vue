<template>
  <div>
    <AdminPageHeader title="Clientes" />

    <AdminToolbar @update:search="searchQuery = $event" />

    <UCard>
      <UTable
        :columns="columns"
        :data="filteredCustomers"
        :loading="loading"
      >
        <template #empty>
          <div class="flex flex-col items-center justify-center py-12">
            <UIcon
              name="i-lucide-inbox"
              class="w-10 h-10 text-warm-300 mb-3"
            />
            <p class="text-sm text-warm-500">
              Nenhum cliente encontrado.
            </p>
          </div>
        </template>

        <template #acoes-cell="{ row }">
          <UButton
            icon="i-lucide-eye"
            size="sm"
            color="neutral"
            variant="ghost"
            @click="viewCustomer(String((row.original as unknown as Customer).id))"
          />
        </template>
      </UTable>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import type { Customer } from '~/types/customer'
import { CustomerService } from '~/services/CustomerService'

definePageMeta({
  layout: 'admin'
})

const customers = ref<Customer[]>([])
const loading = ref(true)
const searchQuery = ref('')

const columns = [
  { accessorKey: 'nome', header: 'Nome' },
  { accessorKey: 'telefone', header: 'Telefone' },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'cidade', header: 'Cidade' },
  { id: 'acoes', header: '' }
]

const filteredCustomers = computed(() => {
  if (!searchQuery.value) return customers.value
  const q = searchQuery.value.toLowerCase()
  return customers.value.filter(
    c =>
      c.nome.toLowerCase().includes(q)
      || c.telefone.includes(q)
      || (c.email && c.email.toLowerCase().includes(q))
  )
})

async function viewCustomer(id: string) {
  await navigateTo(`/admin/customers/${id}`)
}

onMounted(async () => {
  try {
    const response = await CustomerService.getAll()
    if (response.success) {
      customers.value = response.data
    }
  } catch {
    // error handled by empty state
  } finally {
    loading.value = false
  }
})
</script>
