<template>
  <div>
    <AdminPageHeader title="Produtos">
      <template #actions>
        <UButton
          color="primary"
          variant="solid"
          icon="i-lucide-plus"
          @click="navigateTo('/admin/products/new')"
        >
          Novo Produto
        </UButton>
      </template>
    </AdminPageHeader>

    <AdminToolbar @update:search="searchQuery = $event" />

    <UCard>
      <UTable
        :columns="columns"
        :data="filteredProducts"
        :loading="loading"
      >
        <template #imagem-cell="{ row }">
          <div class="w-10 h-10 rounded overflow-hidden bg-warm-100">
            <img
              :src="((row.original as unknown as Product).imagens?.[0]?.url) || ''"
              :alt="(row.original as unknown as Product).nome"
              class="w-full h-full object-cover"
            >
          </div>
        </template>

        <template #preco-cell="{ row }">
          <CatalogProductPrice
            :price="(row.original as unknown as Product).preco"
            :promotional-price="(row.original as unknown as Product).precoPromocional"
          />
        </template>

        <template #ativo-cell="{ row }">
          <UBadge
            :color="(row.original as unknown as Product).ativo ? 'success' : 'neutral'"
            variant="subtle"
            size="sm"
          >
            {{ (row.original as unknown as Product).ativo ? 'Ativo' : 'Inativo' }}
          </UBadge>
        </template>

        <template #acoes-cell="{ row }">
          <div class="flex items-center gap-1">
            <UButton
              icon="i-lucide-pencil"
              size="sm"
              color="neutral"
              variant="ghost"
              @click="navigateTo(`/admin/products/${(row.original as unknown as Product).id}`)"
            />
            <UButton
              :icon="(row.original as unknown as Product).ativo ? 'i-lucide-ban' : 'i-lucide-check-circle'"
              size="sm"
              :color="(row.original as unknown as Product).ativo ? 'warning' : 'success'"
              variant="ghost"
              @click="toggleStatus(row.original as unknown as Product)"
            />
          </div>
        </template>

        <template #empty>
          <div class="flex flex-col items-center justify-center py-12">
            <UIcon
              name="i-lucide-inbox"
              class="w-10 h-10 text-warm-300 mb-3"
            />
            <p class="text-sm text-warm-500">
              Nenhum produto encontrado.
            </p>
          </div>
        </template>
      </UTable>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '~/types/product'

definePageMeta({
  layout: 'admin'
})

const { products, loading, fetchProducts, toggleProductStatus } = useAdminProducts()
const { confirmToggle } = useAppConfirmation()

const searchQuery = ref('')

const columns = [
  { id: 'imagem', header: '' },
  { accessorKey: 'nome', header: 'Nome' },
  { id: 'preco', header: 'Preço' },
  { accessorKey: 'estoque', header: 'Estoque' },
  { id: 'ativo', header: 'Status' },
  { id: 'acoes', header: '' }
]

const filteredProducts = computed(() => {
  if (!searchQuery.value) return products.value
  const q = searchQuery.value.toLowerCase()
  return products.value.filter(
    p => p.nome.toLowerCase().includes(q)
  )
})

onMounted(() => {
  fetchProducts()
})

async function toggleStatus(product: Product) {
  const accepted = await confirmToggle({
    resource: 'produto',
    nome: product.nome,
    ativo: true
  })

  if (!accepted) return

  await toggleProductStatus(product.id)
}
</script>
