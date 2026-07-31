<template>
  <div>
    <AdminPageHeader title="Banners">
      <template #actions>
        <UButton
          color="primary"
          variant="solid"
          icon="i-lucide-plus"
          @click="navigateTo('/admin/banners/new')"
        >
          Novo Banner
        </UButton>
      </template>
    </AdminPageHeader>

    <UCard>
      <UTable
        :columns="columns"
        :data="banners"
        :loading="loading"
      >
        <template #imagem-cell="{ row }">
          <div class="w-24 h-14 rounded overflow-hidden bg-warm-100">
            <img
              :src="(row.original as unknown as Banner).imagem"
              :alt="(row.original as unknown as Banner).titulo || ''"
              class="w-full h-full object-cover"
            >
          </div>
        </template>

        <template #ativo-cell="{ row }">
          <UBadge
            :color="(row.original as unknown as Banner).ativo ? 'success' : 'neutral'"
            variant="subtle"
            size="sm"
          >
            {{ (row.original as unknown as Banner).ativo ? 'Ativo' : 'Inativo' }}
          </UBadge>
        </template>

        <template #acoes-cell="{ row }">
          <div class="flex items-center gap-1">
            <UButton
              icon="i-lucide-pencil"
              size="sm"
              color="neutral"
              variant="ghost"
              @click="navigateTo(`/admin/banners/${(row.original as unknown as Banner).id}`)"
            />

            <UButton
              :icon="(row.original as unknown as Banner).ativo ? 'i-lucide-ban' : 'i-lucide-check-circle'"
              size="sm"
              :color="(row.original as unknown as Banner).ativo ? 'warning' : 'success'"
              variant="ghost"
              @click="toggleStatus(row.original as unknown as Banner)"
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
              Nenhum banner encontrado.
            </p>
          </div>
        </template>
      </UTable>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import type { Banner } from '~/types/banner'
import { BannerService } from '~/services/BannerService'

definePageMeta({
  layout: 'admin'
})

const { confirmToggle } = useAppConfirmation()

const banners = ref<Banner[]>([])
const loading = ref(true)

const columns = [
  { id: 'imagem', header: 'Imagem' },
  { accessorKey: 'titulo', header: 'Título' },
  { accessorKey: 'ordem', header: 'Ordem' },
  { id: 'ativo', header: 'Status' },
  { id: 'acoes', header: '' }
]

async function loadBanners() {
  loading.value = true
  try {
    const response = await BannerService.getAll()
    if (response.success) {
      banners.value = response.data
    }
  } catch {
    // empty state
  } finally {
    loading.value = false
  }
}

async function toggleStatus(banner: Banner) {
  if (banner.ativo) {
    const accepted = await confirmToggle({
      resource: 'banner',
      nome: banner.titulo || 'sem título',
      ativo: true
    })
    if (accepted) {
      await BannerService.toggleStatus(banner.id)
      await loadBanners()
    }
  } else {
    await BannerService.toggleStatus(banner.id)
    await loadBanners()
  }
}

onMounted(() => {
  loadBanners()
})
</script>
