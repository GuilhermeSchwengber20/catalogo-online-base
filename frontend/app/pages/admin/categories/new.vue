<template>
  <div>
    <AdminPageHeader title="Nova Categoria" />

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
            Criar
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
  </div>
</template>

<script setup lang="ts">
import { z } from 'zod'

definePageMeta({
  layout: 'admin'
})

const { createCategory, saving } = useAdminCategories()

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

  const success = await createCategory({
    nome: form.nome,
    descricao: form.descricao || undefined,
    ordem: form.ordem || 0
  })

  if (success) {
    navigateTo('/admin/categories')
  }
}
</script>
