<template>
  <UApp>
    <div class="min-h-screen flex items-center justify-center bg-warm-50 px-4">
      <div class="w-full max-w-sm">
        <div class="text-center mb-8">
          <h1 class="text-2xl font-semibold text-warm-900">
            Dona Decor
          </h1>
          <p class="text-sm text-warm-500 mt-1">
            Painel Administrativo
          </p>
        </div>

        <UCard>
          <form
            class="flex flex-col gap-4"
            @submit.prevent="handleLogin"
          >
            <UFormField
              label="Email"
              name="email"
              required
              :error="errors.email"
            >
              <UInput
                v-model="form.email"
                type="email"
                placeholder="admin@donadecor.com.br"
                class="w-full"
              />
            </UFormField>

            <UFormField
              label="Senha"
              name="senha"
              required
              :error="errors.senha"
            >
              <UInput
                v-model="form.senha"
                type="password"
                placeholder="Sua senha"
                class="w-full"
              />
            </UFormField>

            <UAlert
              v-if="loginError"
              color="error"
              variant="subtle"
              :title="loginError"
            />

            <UButton
              type="submit"
              size="lg"
              color="primary"
              variant="solid"
              class="w-full justify-center"
              :loading="submitting"
              :disabled="submitting"
            >
              {{ submitting ? 'Entrando...' : 'Entrar' }}
            </UButton>
          </form>
        </UCard>
      </div>
    </div>
  </UApp>
</template>

<script setup lang="ts">
import { LoginSchema } from '~/schemas/login.schema'

definePageMeta({
  layout: false
})

const authStore = useAuthStore()
const submitting = ref(false)
const loginError = ref('')

const form = reactive({
  email: '',
  senha: ''
})

const errors = reactive<Record<string, string>>({})

onMounted(() => {
  if (authStore.isAuthenticated) {
    navigateTo('/admin')
  }
})

async function handleLogin() {
  submitting.value = true
  loginError.value = ''
  Object.keys(errors).forEach((key) => {
    errors[key] = ''
  })

  const result = LoginSchema.safeParse(form)
  if (!result.success) {
    const fieldErrors = result.error.flatten().fieldErrors
    for (const [field, msgs] of Object.entries(fieldErrors)) {
      if (msgs && msgs.length > 0) {
        errors[field] = msgs[0] || ''
      }
    }
    submitting.value = false
    return
  }

  try {
    const response = await authStore.login(form.email, form.senha)
    if (response.success) {
      navigateTo('/admin')
    } else {
      loginError.value = String(response.message || 'Email ou senha inválidos')
    }
  } catch {
    loginError.value = 'Erro ao conectar com o servidor'
  } finally {
    submitting.value = false
  }
}
</script>
