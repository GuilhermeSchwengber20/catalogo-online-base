<template>
  <USlideover
    :open="open"
    :title="editing ? 'Editar Categoria' : 'Nova Categoria'"
    @close="$emit('close')"
  >
    <template #body>
      <UForm
        :schema="CategorySchema"
        :state="form"
        class="flex flex-col gap-4"
      >
        <UFormField
          label="Nome"
          name="nome"
          required
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
      </UForm>
    </template>

    <template #footer>
      <div class="flex justify-end gap-3">
        <UButton
          color="neutral"
          variant="outline"
          @click="$emit('close')"
        >
          Cancelar
        </UButton>

        <UButton
          color="primary"
          variant="solid"
          :loading="saving"
          @click="submit"
        >
          {{ editing ? 'Salvar' : 'Criar' }}
        </UButton>
      </div>
    </template>
  </USlideover>
</template>

<script setup lang="ts">
import { CategorySchema } from '~/schemas/category.schema'
import type { CategoryFormData } from '~/schemas/category.schema'

const props = withDefaults(defineProps<{
  open: boolean
  editing?: boolean
  saving?: boolean
  initial?: Partial<CategoryFormData>
}>(), {
  editing: false,
  saving: false,
  initial: undefined
})

const emit = defineEmits<{
  close: []
  save: [data: CategoryFormData]
}>()

const form = reactive<CategoryFormData>({
  nome: '',
  descricao: '',
  ordem: 0
})

watch(
  () => props.open,
  (isOpen) => {
    if (isOpen && props.initial) {
      form.nome = props.initial.nome || ''
      form.descricao = props.initial.descricao || ''
      form.ordem = props.initial.ordem ?? 0
    }
    if (isOpen && !props.initial) {
      form.nome = ''
      form.descricao = ''
      form.ordem = 0
    }
  }
)

function submit() {
  emit('save', {
    nome: form.nome,
    descricao: form.descricao || '',
    ordem: form.ordem || 0
  })
}
</script>
