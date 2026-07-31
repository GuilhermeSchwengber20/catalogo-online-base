<template>
  <div>
    <AdminPageHeader title="Configurações da Loja" />

    <template v-if="loading">
      <UCard>
        <div class="flex flex-col gap-4">
          <USkeleton class="h-10 w-full rounded" />
          <USkeleton class="h-10 w-full rounded" />
          <USkeleton class="h-10 w-full rounded" />
          <USkeleton class="h-10 w-24 rounded" />
        </div>
      </UCard>
    </template>

    <template v-else>
      <UCard>
        <form
          class="flex flex-col gap-4 max-w-lg"
          @submit.prevent="handleSave"
        >
          <UFormField
            label="Nome da Loja"
            name="nomeLoja"
          >
            <UInput
              v-model="form.nomeLoja"
              placeholder="Dona Decor Imports"
              class="w-full"
            />
          </UFormField>

          <UFormField
            label="WhatsApp"
            name="telefoneWhatsapp"
          >
            <UInput
              v-model="form.telefoneWhatsapp"
              placeholder="5511999999999"
              class="w-full"
            />
          </UFormField>

          <UFormField
            label="Email"
            name="email"
          >
            <UInput
              v-model="form.email"
              type="email"
              placeholder="contato@donadecor.com.br"
              class="w-full"
            />
          </UFormField>

          <UFormField
            label="Instagram"
            name="instagram"
          >
            <UInput
              v-model="form.instagram"
              placeholder="https://instagram.com/donadecor"
              class="w-full"
            />
          </UFormField>

          <UFormField
            label="Facebook"
            name="facebook"
          >
            <UInput
              v-model="form.facebook"
              placeholder="https://facebook.com/donadecor"
              class="w-full"
            />
          </UFormField>

          <UFormField
            label="Texto da Home"
            name="textoHome"
          >
            <UTextarea
              v-model="form.textoHome"
              placeholder="Bem-vindo à Dona Decor!"
              class="w-full"
            />
          </UFormField>

          <UFormField
            label="Logo"
            name="logo"
          >
            <div class="flex flex-col gap-3">
              <ImageUploader @uploaded="setLogo" />

              <div
                v-if="form.logo"
                class="relative w-32 h-32 rounded-lg overflow-hidden border border-warm-200"
              >
                <img
                  :src="form.logo"
                  alt="Logo"
                  class="w-full h-full object-contain"
                >
                <button
                  class="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/50 text-white flex items-center justify-center text-xs"
                  @click="form.logo = ''"
                >
                  &times;
                </button>
              </div>
            </div>
          </UFormField>

          <UFormField label="Exibir Preços">
            <USelect
              :model-value="form.mostrarPrecos ? 'sim' : 'nao'"
              :items="[
                { label: 'Sim', value: 'sim' },
                { label: 'Não', value: 'nao' }
              ]"
              class="w-full sm:w-48"
              @update:model-value="form.mostrarPrecos = $event === 'sim'"
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
          </div>

          <p
            v-if="saveMsg"
            class="text-sm"
            :class="saveMsg.includes('sucesso') ? 'text-success' : 'text-error'"
          >
            {{ saveMsg }}
          </p>
        </form>
      </UCard>
    </template>
  </div>
</template>

<script setup lang="ts">
import { SettingsService } from '~/services/SettingsService'

definePageMeta({
  layout: 'admin'
})

const loading = ref(true)
const saving = ref(false)
const saveMsg = ref('')

const form = reactive({
  nomeLoja: '',
  telefoneWhatsapp: '',
  email: '',
  instagram: '',
  facebook: '',
  textoHome: '',
  logo: '',
  mostrarPrecos: true
})

function setLogo(url: string) {
  form.logo = url
}

onMounted(async () => {
  try {
    const response = await SettingsService.getAll()
    if (response.success) {
      const s = response.data
      form.nomeLoja = s.nomeLoja
      form.telefoneWhatsapp = s.telefoneWhatsapp
      form.email = s.email || ''
      form.instagram = s.instagram || ''
      form.facebook = s.facebook || ''
      form.textoHome = s.textoHome || ''
      form.logo = s.logo || ''
      form.mostrarPrecos = s.mostrarPrecos
    }
  } catch {
    saveMsg.value = 'Erro ao carregar configurações'
  } finally {
    loading.value = false
  }
})

async function handleSave() {
  saving.value = true
  saveMsg.value = ''

  try {
    const response = await SettingsService.update({
      nomeLoja: form.nomeLoja,
      telefoneWhatsapp: form.telefoneWhatsapp,
      email: form.email || undefined,
      instagram: form.instagram || undefined,
      facebook: form.facebook || undefined,
      textoHome: form.textoHome || undefined,
      logo: form.logo || undefined,
      mostrarPrecos: form.mostrarPrecos
    })

    if (response.success) {
      saveMsg.value = 'Configurações salvas com sucesso'
    } else {
      saveMsg.value = 'Erro ao salvar configurações'
    }
  } catch {
    saveMsg.value = 'Erro ao conectar com o servidor'
  } finally {
    saving.value = false
  }
}
</script>
