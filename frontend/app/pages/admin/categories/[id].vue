<template>
  <div>
    <AdminPageHeader title="Editar Categoria" />

    <template v-if="loading">
      <UCard>
        <div class="flex flex-col gap-4">
          <USkeleton class="h-10 w-full rounded" />
          <USkeleton class="h-24 w-full rounded" />
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
              placeholder="Nome da categoria"
              class="w-full"
            />
          </UFormField>

          <UFormField
            label="Descrição"
            name="descricao"
          >
            <UTextarea
              v-model="form.descricao"
              placeholder="Descrição opcional"
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
              @click="navigateTo('/admin/categories')"
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
import { CategoryService } from '~/services/CategoryService'

definePageMeta({
  layout: 'admin'
})

const route = useRoute()
const id = computed(() => route.params.id as string)

const { updateCategory, saving } = useAdminCategories()

const loading = ref(true)
const errorMsg = ref('')

const form = reactive({
  nome: '',
  descricao: '',
  ordem: 0
})

const errors = reactive<Record<string, string>>({})

const schema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório').max(100, 'Máximo 100 caracteres'),
  descricao: z.string().optional().or(z.literal('')),
  ordem: z.number().optional().default(0)
})

onMounted(async () => {
  try {
    const response = await CategoryService.getById(id.value)
    if (response.success) {
      const cat = response.data
      form.nome = cat.nome
      form.descricao = cat.descricao || ''
      form.ordem = cat.ordem
    } else {
      errorMsg.value = 'Categoria não encontrada'
    }
  } catch {
    errorMsg.value = 'Erro ao carregar categoria'
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

  const success = await updateCategory(id.value, {
    nome: form.nome,
    descricao: form.descricao || undefined,
    ordem: form.ordem || 0
  })

  if (success) {
    navigateTo('/admin/categories')
  }
}
</script>
