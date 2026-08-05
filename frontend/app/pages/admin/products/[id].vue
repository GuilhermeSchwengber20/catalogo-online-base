<template>
  <div>
    <AdminPageHeader title="Editar Produto" />

    <template v-if="loading">
      <UCard>
        <div class="flex flex-col gap-4">
          <USkeleton class="h-10 w-full rounded" />
          <USkeleton class="h-10 w-full rounded" />
          <USkeleton class="h-24 w-full rounded" />
          <div class="grid grid-cols-2 gap-4">
            <USkeleton class="h-10 rounded" />
            <USkeleton class="h-10 rounded" />
          </div>
          <USkeleton class="h-10 w-24 rounded" />
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

    <template v-else>
      <UCard>
        <form
          class="flex flex-col gap-4 max-w-lg"
          @submit.prevent="handleSave"
        >
          <UFormField
            label="Nome"
            name="nome"
            required
            :error="errors.nome"
          >
            <UInput
              v-model="form.nome"
              placeholder="Nome do produto"
              class="w-full"
            />
          </UFormField>

          <UFormField
            label="Categoria"
            name="categoriaId"
            required
            :error="errors.categoriaId"
          >
            <USelect
              v-model="form.categoriaId"
              :items="categoryOptions"
              placeholder="Selecione uma categoria"
              class="w-full"
            />
          </UFormField>

          <UFormField
            label="Descrição"
            name="descricao"
          >
            <UTextarea
              v-model="form.descricao"
              placeholder="Descrição do produto"
              class="w-full"
            />
          </UFormField>

          <div class="grid grid-cols-2 gap-4">
            <UFormField
              label="Preço"
              name="preco"
              required
              :error="errors.preco"
            >
              <SharedCurrencyInput
                v-model="form.preco"
              />
            </UFormField>

            <UFormField
              label="Preço Promocional"
              name="precoPromocional"
            >
              <SharedCurrencyInput
                v-model="form.precoPromocional"
              />
            </UFormField>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <UFormField
              label="Cor"
              name="cor"
            >
              <UInput
                v-model="form.cor"
                placeholder="Azul"
                class="w-full"
              />
            </UFormField>

            <UFormField
              label="Tamanho"
              name="tamanho"
            >
              <UInput
                v-model="form.tamanho"
                placeholder="M"
                class="w-full"
              />
            </UFormField>
          </div>

          <UFormField
            label="Estoque"
            name="estoque"
          >
            <UInput
              v-model.number="form.estoque"
              type="number"
              min="0"
              placeholder="0"
              class="w-full"
            />
          </UFormField>
          <UFormField
            label="Imagens"
          >
            <UFileUpload
              v-model="images"
              icon="i-lucide-image"
              label="Arraste suas imagens aqui"
              description="SVG, PNG ou JPG(max. 5MB)"
              layout="list"
              multiple
              :interactive="false"
              class="w-96 min-h-48"
            >
              <template #actions="{ open }">
                <UButton
                  label="Selecionar imagens"
                  icon="i-lucide-upload"
                  color="neutral"
                  variant="outline"
                  @click="open()"
                />
              </template>

              <template #files-bottom="{ removeFile, files }">
                <div class="flex flex-row items-center justify-center gap-4">
                  <UButton
                    v-if="files?.length"
                    label="Remover todas imagens"
                    color="neutral"
                    @click="removeFile()"
                  />
                  <UButton
                    v-if="files?.length"
                    label="Enviar imagens"
                    color="primary"
                    @click="handleSaveImages"
                  />
                </div>
              </template>
            </UFileUpload>
            <div class="flex flex-col gap-3">
              <div
                v-if="imageUrls.length"
                class="flex flex-wrap gap-2"
              >
                <div
                  v-for="(img, index) in imageUrls"
                  :key="index"
                  class="relative w-20 h-20 rounded-lg overflow-hidden border border-warm-200"
                >
                  <img
                    :src="img.url"
                    alt=""
                    class="w-full h-full object-cover"
                  >
                  <UButton
                    class="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/50 text-white flex items-center justify-center text-xs"
                    @click.stop="removeImage(index)"
                  >
                    &times;
                  </UButton>
                </div>
              </div>
            </div>
          </UFormField>

          <div class="flex items-center gap-3 pt-2">
            <UButton
              type="submit"
              color="primary"
              variant="solid"
              :loading="saving"
              :disabled="saving"
            >
              Salvar
            </UButton>

            <UButton
              color="neutral"
              variant="outline"
              @click="navigateTo('/admin/products')"
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
import { z } from 'zod'
import type { Category } from '~/types/category'
import { ProductService } from '~/services/ProductService'
import { CategoryService } from '~/services/CategoryService'
import { UploadService } from '~/services/UploadService'

definePageMeta({
  layout: 'admin'
})

const route = useRoute()
const id = computed(() => route.params.id as string)

const { updateProduct, saving } = useAdminProducts()

const loading = ref(true)
const errorMsg = ref('')

const form = reactive<{
  nome: string
  categoriaId: string
  descricao: string
  preco: number
  precoPromocional: number | null
  cor: string
  tamanho: string
  estoque: number
}>({
  nome: '',
  categoriaId: '',
  descricao: '',
  preco: 0,
  precoPromocional: null,
  cor: '',
  tamanho: '',
  estoque: 0
})

const images = ref<File[]>([])
const imageUrls = ref<{ url: string, publicId: string, ordem: number }[]>([])

const errors = reactive<Record<string, string>>({})
const categoryOptions = ref<Array<{ label: string, value: string }>>([])

const schema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório').max(150, 'Máximo 150 caracteres'),
  categoriaId: z.string().min(1, 'Categoria é obrigatória'),
  descricao: z.string().optional().or(z.literal('')),
  preco: z.number().positive('Preço é obrigatório'),
  precoPromocional: z.number().optional().nullable(),
  cor: z.string().optional().or(z.literal('')),
  tamanho: z.string().optional().or(z.literal('')),
  estoque: z.number().min(0, 'Não pode ser negativo').optional().default(0)
})

onMounted(async () => {
  try {
    const [catResponse, prodResponse] = await Promise.all([
      CategoryService.getAll(),
      ProductService.getById(id.value)
    ])

    if (catResponse.success) {
      categoryOptions.value = catResponse.data.map((cat: Category) => ({
        label: cat.nome,
        value: cat.id
      }))
    }

    if (prodResponse.success) {
      const p = prodResponse.data
      form.nome = p.nome
      console.log(p);
      form.categoriaId = p.categoriaId
      form.descricao = p.descricao || ''
      form.preco = p.preco
      form.precoPromocional = p.precoPromocional || null
      form.cor = p.cor || ''
      form.tamanho = p.tamanho || ''
      form.estoque = p.estoque

      if (p?.imagens) {
        imageUrls.value = p.imagens.map((img) => {
          return {
            url: img.url,
            publicId: img.publicId,
            ordem: 0
          }
        })
      }
    } else {
      errorMsg.value = 'Produto não encontrado'
    }
  } catch (err: any) {
    console.log(err);
    errorMsg.value = 'Erro ao carregar produto'
  } finally {
    loading.value = false
  }
})

async function handleSave() {
  Object.keys(errors).forEach((key) => {
    errors[key] = ''
  })

  const result = schema.safeParse(form)
  if (!result.success) {
    const fieldErrors = result.error.flatten().fieldErrors
    for (const [field, msgs] of Object.entries(fieldErrors)) {
      if (msgs && msgs.length > 0) {
        errors[field] = msgs[0] || ''
      }
    }
    return
  }

  const success = await updateProduct(id.value, {
    nome: form.nome,
    categoriaId: form.categoriaId,
    descricao: form.descricao || undefined,
    preco: form.preco,
    precoPromocional: form.precoPromocional || null,
    cor: form.cor || undefined,
    tamanho: form.tamanho || undefined,
    estoque: form.estoque || 0
  }, imageUrls.value)

  if (success) {
    navigateTo('/admin/products')
  }
}

async function handleSaveImages() {
  const result = await UploadService.uploadImages(images.value)
  if (result.data?.length) {
    imageUrls.value.push(
      ...result.data.map((image, index) => ({
        url: image.url,
        publicId: image.publicId,
        ordem: imageUrls.value.length + index
      }))
    )

    images.value = []
  }
}

function removeImage(index: number) {
  imageUrls.value.splice(index, 1)
}
</script>
