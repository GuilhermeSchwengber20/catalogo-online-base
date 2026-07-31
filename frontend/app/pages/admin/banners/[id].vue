<template>
  <div>
    <AdminPageHeader title="Editar Banner">
      <template #actions>
        <UButton
          color="neutral"
          variant="outline"
          @click="navigateTo('/admin/banners')"
        >
          Voltar
        </UButton>
      </template>
    </AdminPageHeader>

    <template v-if="loading">
      <UCard>
        <USkeleton class="h-10 w-full rounded mb-4" />
        <USkeleton class="h-10 w-full rounded mb-4" />
        <USkeleton class="h-40 w-full rounded mb-4" />
        <USkeleton class="h-10 w-24 rounded" />
      </UCard>
    </template>

    <template v-else-if="errorMsg">
      <UAlert
        color="error"
        variant="subtle"
        :title="errorMsg"
      />
    </template>

    <template v-else>
      <UCard>
        <form
          class="flex flex-col gap-4 max-w-lg"
          @submit.prevent="handleSave"
        >
          <UFormField label="Título">
            <UInput
              v-model="form.titulo"
              placeholder="Coleção Verão"
              class="w-full"
            />
          </UFormField>

          <UFormField label="Subtítulo">
            <UInput
              v-model="form.subtitulo"
              placeholder="Aproveite as ofertas"
              class="w-full"
            />
          </UFormField>

          <UFormField label="Link">
            <UInput
              v-model="form.link"
              placeholder="https://..."
              class="w-full"
            />
          </UFormField>

          <UFormField label="Ordem">
            <UInput
              v-model.number="form.ordem"
              type="number"
              min="0"
              placeholder="0"
              class="w-full"
            />
          </UFormField>

          <UFormField label="Imagem">
            <div class="flex flex-col gap-3">
              <UFileUpload
                v-model="image"
                icon="i-lucide-image"
                label="Arraste sua imagem aqui"
                description="SVG, PNG, JPG or GIF (max. 5MB)"
                class="w-96 min-h-48"
              />
              <UButton @click="sendImage">
                Enviar imagem
              </UButton>

              <div
                v-if="form.imagem"
                class="relative w-full aspect-video rounded-lg overflow-hidden border border-warm-200"
              >
                <img
                  :src="form.imagem"
                  alt="Preview"
                  class="w-full h-full object-cover"
                >
                <button
                  class="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/50 text-white flex items-center justify-center text-sm"
                  @click="form.imagem = ''"
                >
                  &times;
                </button>
              </div>
            </div>
          </UFormField>

          <div class="flex items-center gap-3 pt-2">
            <UButton
              type="submit"
              color="primary"
              variant="solid"
              :loading="saving"
              :disabled="saving || !form.imagem"
            >
              Salvar
            </UButton>

            <UButton
              color="neutral"
              variant="outline"
              @click="navigateTo('/admin/banners')"
            >
              Cancelar
            </UButton>
          </div>
        </form>
      </UCard>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { Banner } from '~/types/banner'
import { BannerService } from '~/services/BannerService'
import { UploadService } from '~/services/UploadService'

definePageMeta({
  layout: 'admin'
})

const route = useRoute()
const id = computed(() => route.params.id as string)

const loading = ref(true)
const saving = ref(false)
const errorMsg = ref('')

const form = reactive({
  titulo: '',
  subtitulo: '',
  link: '',
  ordem: 0,
  imagem: ''
})

const image = ref<File | null>(null)

onMounted(async () => {
  try {
    const response = await BannerService.getAll()
    const banner = (response.data as Banner[]).find(b => b.id === id.value)
    if (banner) {
      form.titulo = banner.titulo || ''
      form.subtitulo = banner.subtitulo || ''
      form.link = banner.link || ''
      form.ordem = banner.ordem
      form.imagem = banner.imagem
    } else {
      errorMsg.value = 'Banner não encontrado'
    }
  } catch {
    errorMsg.value = 'Erro ao carregar banner'
  } finally {
    loading.value = false
  }
})

async function handleSave() {
  if (!form.imagem) return

  saving.value = true
  try {
    await BannerService.update(id.value, {
      titulo: form.titulo || undefined,
      subtitulo: form.subtitulo || undefined,
      link: form.link || undefined,
      ordem: form.ordem || 0,
      imagem: form.imagem
    })
    navigateTo('/admin/banners')
  } catch {
    // error
  } finally {
    saving.value = false
  }
}

async function sendImage() {
  if (!image.value) return
  const response = await UploadService.uploadImages([image.value])

  const uploadedImage = response.data?.[0]

  if (uploadedImage) {
    form.imagem = uploadedImage.url
  }
}
</script>
