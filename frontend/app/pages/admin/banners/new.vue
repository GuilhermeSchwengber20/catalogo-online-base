<template>
  <div>
    <AdminPageHeader title="Novo Banner" />

    <UCard>
      <form
        class="flex flex-col gap-4 max-w-lg"
        @submit.prevent="handleSave"
      >
        <UFormField
          label="Título"
          name="titulo"
        >
          <UInput
            v-model="form.titulo"
            placeholder="Coleção Verão"
            class="w-full"
          />
        </UFormField>

        <UFormField
          label="Subtítulo"
          name="subtitulo"
        >
          <UInput
            v-model="form.subtitulo"
            placeholder="Aproveite as ofertas"
            class="w-full"
          />
        </UFormField>

        <UFormField
          label="Link"
          name="link"
        >
          <UInput
            v-model="form.link"
            placeholder="https://..."
            class="w-full"
          />
        </UFormField>

        <UFormField
          label="Ordem"
          name="ordem"
        >
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
            <UButton
              v-if="form.imagem"
              @click="sendImage"
            >
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
            Criar
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
  </div>
</template>

<script setup lang="ts">
import { BannerService } from '~/services/BannerService'
import { UploadService } from '~/services/UploadService'

definePageMeta({
  layout: 'admin'
})

const saving = ref(false)

const form = reactive({
  titulo: '',
  subtitulo: '',
  link: '',
  ordem: 0,
  imagem: ''
})

const image = ref<File | null>(null)

async function handleSave() {
  if (!form.imagem) return

  saving.value = true
  try {
    await BannerService.create({
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
