<template>
  <LayoutAppSection>
    <div class="max-w-lg mx-auto">
      <h1 class="text-xl font-semibold text-warm-900 mb-6">
        Finalizar Pedido
      </h1>

      <template v-if="!isEmpty">
        <div class="flex flex-col gap-3 mb-6 p-4 bg-warm-50 rounded-xl">
          <div
            v-for="item in items"
            :key="item.product.id"
            class="flex items-center justify-between text-sm"
          >
            <span class="text-warm-700 line-clamp-1 flex-1">
              {{ item.product.nome }}
              <span class="text-warm-400">x{{ item.quantity }}</span>
            </span>
            <span class="font-medium text-warm-900 ml-2">
              {{ formatCurrency(calculateItemTotal(item)) }}
            </span>
          </div>

          <div class="flex items-center justify-between pt-3 border-t border-warm-200">
            <span class="font-semibold text-warm-900">Subtotal</span>
            <span class="font-semibold text-warm-900">{{ formatCurrency(subtotal) }}</span>
          </div>
        </div>

        <form
          class="flex flex-col gap-4"
          @submit.prevent="handleSubmit"
        >
          <UFormField
            label="Nome"
            name="nome"
            required
            :error="errors.nome"
          >
            <UInput
              v-model="form.nome"
              placeholder="Seu nome completo"
              class="w-full"
            />
          </UFormField>

          <UFormField
            label="Telefone"
            name="telefone"
            required
            :error="errors.telefone"
          >
            <UInput
              :model-value="form.telefone"
              placeholder="(11) 99999-9999"
              class="w-full"
              @update:model-value="form.telefone = maskPhone($event)"
            />
          </UFormField>

          <UFormField
            label="Email"
            name="email"
            :error="errors.email"
          >
            <UInput
              v-model="form.email"
              type="email"
              placeholder="email@exemplo.com"
              class="w-full"
            />
          </UFormField>

          <UFormField
            label="Cidade"
            name="cidade"
          >
            <UInput
              v-model="form.cidade"
              placeholder="Sua cidade"
              class="w-full"
            />
          </UFormField>

          <UFormField
            label="Observação"
            name="observacao"
          >
            <UTextarea
              v-model="form.observacao"
              placeholder="Alguma observação sobre o pedido?"
              class="w-full"
            />
          </UFormField>

          <UButton
            type="submit"
            size="lg"
            color="primary"
            variant="solid"
            class="w-full justify-center gap-2 mt-2"
            :loading="submitting"
            :disabled="submitting"
          >
            <UIcon
              name="i-lucide-send"
              class="w-5 h-5"
            />
            {{ submitting ? 'Enviando...' : 'Finalizar Pedido' }}
          </UButton>
        </form>

        <p
          v-if="error"
          class="mt-4 text-sm text-error text-center"
        >
          {{ error }}
        </p>
      </template>

      <SharedEmptyCatalog
        v-else
        message="Seu carrinho está vazio. Adicione produtos antes de finalizar."
      >
        <template #action>
          <UButton
            color="primary"
            variant="soft"
            to="/"
          >
            Ver Produtos
          </UButton>
        </template>
      </SharedEmptyCatalog>
    </div>
  </LayoutAppSection>
</template>

<script setup lang="ts">
import { CheckoutSchema } from '~/schemas/checkout.schema'
import type { CartItem } from '~/types/cart'
import { OrderService } from '~/services/OrderService'
import { maskPhone, cleanPhone } from '~/utils/format'

const cartStore = useCartStore()
const { items, subtotal, isEmpty } = storeToRefs(cartStore)
const { clearCart } = cartStore

const submitting = ref(false)
const error = ref<string | null>(null)

const form = reactive({
  nome: '',
  telefone: '',
  email: '',
  cidade: '',
  observacao: ''
})

const errors = reactive<Record<string, string>>({})

function calculateItemTotal(item: CartItem): string {
  const price = item.product.precoPromocional || item.product.preco
  return (price * item.quantity).toFixed(2)
}

async function handleSubmit() {
  submitting.value = true
  error.value = null
  Object.keys(errors).forEach((key) => {
    errors[key] = ''
  })

  const result = CheckoutSchema.safeParse(form)
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
    const response = await OrderService.createFromCatalog({
      cliente: {
        nome: form.nome,
        telefone: cleanPhone(form.telefone),
        email: form.email || undefined,
        cidade: form.cidade || undefined
      },
      itens: items.value.map(item => ({
        produtoId: item.product.id,
        quantidade: item.quantity
      })),
      observacaoCliente: form.observacao || ''
    })

    if (response.success) {
      const { mensagem } = response.data
      clearCart()
      navigateTo({
        path: '/order/success',
        query: { msg: mensagem }
      })
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Erro ao criar pedido'
    error.value = message
  } finally {
    submitting.value = false
  }
}

onMounted(() => {
  if (isEmpty.value) {
    navigateTo('/cart')
  }
})
</script>
