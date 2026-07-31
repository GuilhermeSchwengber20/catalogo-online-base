<template>
  <div>
    <AdminPageHeader title="Categorias">
      <template #actions>
        <UButton
          color="primary"
          variant="solid"
          icon="i-lucide-plus"
          @click="navigateTo('/admin/categories/new')"
        >
          Nova Categoria
        </UButton>
      </template>
    </AdminPageHeader>

    <AdminToolbar @update:search="searchQuery = $event" />

    <UCard>
      <UTable
        :columns="columns"
        :data="filteredCategories"
        :loading="loading"
      >
        <template #ativo-cell="{ row }">
          <UBadge
            :color="(row.original as unknown as Category).ativo ? 'success' : 'neutral'"
            variant="subtle"
            size="sm"
          >
            {{ (row.original as unknown as Category).ativo ? 'Ativo' : 'Inativo' }}
          </UBadge>
        </template>

        <template #acoes-cell="{ row }">
          <div class="flex items-center gap-1">
            <UButton
              icon="i-lucide-pencil"
              size="sm"
              color="neutral"
              variant="ghost"
              @click="navigateTo(`/admin/categories/${(row.original as unknown as Category).id}`)"
            />

            <UButton
              :icon="(row.original as unknown as Category).ativo ? 'i-lucide-ban' : 'i-lucide-check-circle'"
              size="sm"
              :color="(row.original as unknown as Category).ativo ? 'warning' : 'success'"
              variant="ghost"
              @click="toggleStatus(row.original as unknown as Category)"
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
              Nenhum registro encontrado.
            </p>
          </div>
        </template>
      </UTable>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import type { Category } from '~/types/category'

definePageMeta({
  layout: 'admin'
})

const { categories, loading, fetchCategories, toggleCategoryStatus } = useAdminCategories()
const { confirmToggle } = useAppConfirmation()

const searchQuery = ref('')

const columns = [
  { accessorKey: 'nome', header: 'Nome' },
  { accessorKey: 'slug', header: 'Slug' },
  { accessorKey: 'ordem', header: 'Ordem' },
  { id: 'ativo', header: 'Status' },
  { id: 'acoes', header: '' }
]

const filteredCategories = computed(() => {
  if (!searchQuery.value) return categories.value
  const q = searchQuery.value.toLowerCase()
  return categories.value.filter(
    c => c.nome.toLowerCase().includes(q) || c.slug.toLowerCase().includes(q)
  )
})

onMounted(() => {
  fetchCategories()
})

async function toggleStatus(category: Category) {
  const accepted = await confirmToggle({
    resource: 'categoria',
    nome: category.nome,
    ativo: category.ativo
  })

  if (!accepted) return

  await toggleCategoryStatus(category.id)
}
</script>
