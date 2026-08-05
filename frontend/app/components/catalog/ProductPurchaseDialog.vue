<template>
  <UModal
    v-model:open="isOpen"
    :ui="{
      content: 'max-w-4xl'
    }"
    @close="$emit('close')"
  >
    <template #content>
      <div class="grid md:grid-cols-2 gap-6 p-6">
        <div class="relative">
          <div class="aspect-square rounded-lg overflow-hidden bg-warm-100">
            <img
              v-for="(image, index) in product.imagens || []"
              :key="image.id"
              :src="image.url"
              :alt="product.nome"
              class="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
              :class="index === imageIndex ? 'opacity-100' : 'opacity-0'"
            >

            <div
              v-if="!product.imagens?.length"
              class="w-full h-full flex items-center justify-center"
            >
              <UIcon
                name="i-lucide-image-off"
                class="w-12 h-12 text-warm-300"
              />
            </div>

            <button
              v-if="(product.imagens?.length || 0) > 1"
              class="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-2 shadow"
              @click="prevImage"
            >
              <UIcon name="i-lucide-chevron-left" />
            </button>

            <button
              v-if="(product.imagens?.length || 0) > 1"
              class="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-2 shadow"
              @click="nextImage"
            >
              <UIcon name="i-lucide-chevron-right" />
            </button>

            <div
              v-if="(product.imagens?.length || 0) > 1"
              class="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full"
            >
              {{ imageIndex + 1 }}/{{ product.imagens!.length }}
            </div>
          </div>
        </div>

        <div class="flex flex-col">
          <CatalogProductRating />

          <h2 class="mt-2 text-2xl font-semibold text-warm-900">
            {{ product.nome }}
          </h2>

          <div class="mt-3">
            <CatalogProductPrice
              :price="product.preco"
              :promotional-price="product.precoPromocional"
            />
          </div>

          <p
            v-if="product.descricao"
            class="mt-5 text-sm text-warm-600 leading-relaxed"
          >
            {{ product.descricao }}
          </p>

          <div class="mt-6 flex items-center justify-between">
            <span class="text-sm text-warm-500">
              Quantidade
            </span>

            <CartQuantitySelector
              :model-value="quantity"
              :max="product.estoque || null"
              @update:model-value="quantity = $event"
            />
          </div>

          <div class="mt-auto pt-8">
            <UButton
              block
              size="xl"
              color="primary"
              @click="addToCart"
            >
              Adicionar ao Carrinho
            </UButton>
          </div>
        </div>
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import type { Product } from '~/types/product'

const props = defineProps<{
  open: boolean
  product: Product
}>()

const emit = defineEmits<{
  'close': [],
  'add-to-cart': [product: Product, quantity: number],
  'update:open': [boolean]
}>()

const isOpen = computed({
  get: () => props.open,
  set: (value) => emit('update:open', value)
})

const quantity = ref(1)
const imageIndex = ref(0)

const totalImages = computed(() => props.product.imagens?.length || 1)

function prevImage() {
  if (imageIndex.value > 0) {
    imageIndex.value--
  } else {
    imageIndex.value = totalImages.value - 1
  }
}

function nextImage() {
  if (imageIndex.value < totalImages.value - 1) {
    imageIndex.value++
  } else {
    imageIndex.value = 0
  }
}

watch(
  () => props.open,
  (isOpen) => {
    if (isOpen) {
      quantity.value = 1
      imageIndex.value = 0
    }
  }
)

function addToCart() {
  emit('add-to-cart', props.product, quantity.value)
  emit('close')
}
</script>
