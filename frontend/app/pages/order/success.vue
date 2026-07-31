<template>
  <LayoutAppSection>
    <div class="max-w-lg mx-auto text-center">
      <div class="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
        <UIcon
          name="i-lucide-check"
          class="w-8 h-8 text-green-600"
        />
      </div>

      <h1 class="text-2xl font-semibold text-warm-900 mb-2">
        Pedido Registrado!
      </h1>

      <p class="text-warm-500 mb-8">
        Seu pedido foi criado com sucesso. Agora é só confirmar no WhatsApp para finalizar.
      </p>

      <UButton
        size="lg"
        color="success"
        variant="solid"
        class="w-full justify-center gap-2 mb-4"
        @click="openWhatsApp"
      >
        <UIcon
          name="i-lucide-message-circle"
          class="w-5 h-5"
        />
        Falar no WhatsApp
      </UButton>

      <p class="text-xs text-warm-400 mb-8">
        Ao clicar no botão acima, você será redirecionado ao WhatsApp com uma mensagem pronta. É só enviar!
      </p>

      <UButton
        variant="ghost"
        color="neutral"
        to="/"
      >
        <UIcon
          name="i-lucide-arrow-left"
          class="w-4 h-4"
        />
        Continuar Comprando
      </UButton>
    </div>
  </LayoutAppSection>
</template>

<script setup lang="ts">
const route = useRoute()
const message = computed(() => (route.query.msg as string) || '')

// mudar aqui
function openWhatsApp() {
  if (!message.value) return

  const settingsStore = useSettingsStore()
  const phone = settingsStore.whatsappNumber || '5511999999999'
  const url = `https://wa.me/${phone}?text=${message.value}`
  window.open(url, '_blank')
}
</script>
