<template>
  <UDrawer
    :open="open"
    side="bottom"
    @close="$emit('close')"
  >
    <template #body>
      <div class="flex flex-col gap-4">
        <div class="relative aspect-square rounded-lg overflow-hidden bg-warm-100">
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
            class="w-full h-full flex items-center justify-center bg-warm-100"
          >
            <UIcon
              name="i-lucide-image-off"
              class="w-10 h-10 text-warm-300"
            />
          </div>

          <button
            v-if="(product.imagens?.length || 0) > 1"
            class="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center shadow-sm hover:bg-white transition-colors"
            @click="prevImage"
          >
            <UIcon
              name="i-lucide-chevron-left"
              class="w-4 h-4 text-warm-700"
            />
          </button>

          <button
            v-if="(product.imagens?.length || 0) > 1"
            class="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center shadow-sm hover:bg-white transition-colors"
            @click="nextImage"
          >
            <UIcon
              name="i-lucide-chevron-right"
              class="w-4 h-4 text-warm-700"
            />
          </button>

          <div
            v-if="(product.imagens?.length || 0) > 1"
            class="absolute top-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full"
          >
            {{ imageIndex + 1 }}/{{ product.imagens!.length }}
          </div>
        </div>

        <div class="flex flex-col gap-1">
          <CatalogProductRating />

          <span class="font-semibold text-warm-900 text-lg">
            {{ product.nome }}
          </span>

          <CatalogProductPrice
            :price="product.preco"
            :promotional-price="product.precoPromocional"
          />
        </div>

        <div class="flex items-center justify-between">
          <span class="text-sm text-warm-500">Quantidade</span>

          <CartQuantitySelector
            :model-value="quantity"
            :max="product.estoque || null"
            @update:model-value="quantity = $event"
          />
        </div>

        <UButton
          size="lg"
          color="primary"
          variant="solid"
          class="w-full"
          @click="addToCart"
        >
          Adicionar ao Carrinho
        </UButton>
      </div>
    </template>
  </UDrawer>
</template>

<script setup lang="ts">
import type { Product } from '~/types/product'

const props = defineProps<{
  open: boolean
  product: Product
}>()

const emit = defineEmits<{
  'close': []
  'add-to-cart': [product: Product, quantity: number]
}>()

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
