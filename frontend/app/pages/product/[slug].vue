<template>
  <div>
    <template v-if="loading">
      <LayoutAppSection>
        <USkeleton class="aspect-square rounded-xl mb-4" />
        <USkeleton class="h-6 w-3/4 mb-2 rounded" />
        <USkeleton class="h-5 w-1/3 mb-4 rounded" />
        <USkeleton class="h-20 w-full rounded" />
      </LayoutAppSection>
    </template>

    <template v-else-if="error">
      <LayoutAppSection>
        <SharedErrorDisplay
          :message="error?.message"
          retryable
          @retry="loadProduct"
        />
      </LayoutAppSection>
    </template>

    <template v-else-if="product">
      <div class="sticky top-(--ui-header-height) z-10 bg-default border-b border-default">
        <LayoutAppSection class="py-0">
          <UBreadcrumb
            :items="[
              { label: 'Início', to: '/' },
              { label: product.nome, to: '' }
            ]"
            class="py-2 text-sm"
          />
        </LayoutAppSection>
      </div>

      <LayoutAppSection>
        <div class="lg:grid lg:grid-cols-2 lg:gap-8">
          <div class="mb-6 lg:mb-0">
            <div class="relative">
              <CatalogProductGallery
                v-if="product.imagens?.length"
                :images="product.imagens"
                :alt="product.nome"
              />
              <div
                v-else
                class="aspect-square rounded-xl bg-warm-100 flex items-center justify-center"
              >
                <UIcon
                  name="i-lucide-image-off"
                  class="w-12 h-12 text-warm-300"
                />
              </div>
            </div>
          </div>

          <div class="flex flex-col gap-6">
            <div class="flex flex-col gap-2">
              <h1 class="text-2xl font-semibold text-warm-900">
                {{ product.nome }}
              </h1>

              <NuxtLink
                v-if="product.categoria.nome"
                :to="`/category/${product.categoria.slug}`"
                class="text-sm text-primary hover:underline"
              >
                {{ product.categoria.nome }}
              </NuxtLink>
            </div>

            <CatalogProductPrice
              :price="product.preco"
              :promotional-price="product.precoPromocional"
              class="text-xl"
            />

            <p
              v-if="product.descricao"
              class="text-warm-600 leading-relaxed"
            >
              {{ product.descricao }}
            </p>

            <div
              v-if="product.cor || product.tamanho"
              class="flex flex-wrap gap-4"
            >
              <div
                v-if="product.cor"
                class="flex flex-col gap-1"
              >
                <span class="text-xs text-warm-500 uppercase tracking-wide">Cor</span>
                <span class="font-medium text-warm-900">{{ product.cor }}</span>
              </div>

              <div
                v-if="product.tamanho"
                class="flex flex-col gap-1"
              >
                <span class="text-xs text-warm-500 uppercase tracking-wide">Tamanho</span>
                <span class="font-medium text-warm-900">{{ product.tamanho }}</span>
              </div>
            </div>

            <div class="flex items-center gap-4">
              <span class="text-sm text-warm-500">Quantidade</span>
              <CartQuantitySelector
                :model-value="quantity"
                :max="product.estoque"
                @update:model-value="quantity = $event"
              />
            </div>

            <div
              v-if="product.estoque <= 5 && product.estoque > 0"
              class="text-sm text-warning"
            >
              Apenas {{ product.estoque }} {{ product.estoque === 1 ? 'unidade' : 'unidades' }} em estoque
            </div>

            <div
              v-if="product.estoque === 0"
              class="text-sm text-error font-medium"
            >
              Produto indisponível
            </div>

            <UButton
              size="lg"
              color="primary"
              variant="solid"
              class="w-full sm:w-auto"
              :disabled="product.estoque === 0"
              @click="addToCart"
            >
              Adicionar ao Carrinho
            </UButton>
          </div>
        </div>
      </LayoutAppSection>
    </template>
  </div>
</template>
<script setup lang="ts">

const route = useRoute()

const slug = computed(() => route.params.slug as string)

const {
  data: product,
  pending: loading,
  error,
  refresh: loadProduct
} = await useCatalogProduct(slug)

const quantity = ref(1)

const cartStore = useCartStore()

const pageTitle = computed(() =>
  product.value
    ? `${product.value.nome} - Dona Decor`
    : 'Produto'
)

useSeoMeta({
  title: pageTitle,

  description: () =>
    product.value?.descricao?.slice(0, 160)
    || 'Detalhes do produto na Dona Decor Imports.',

  ogTitle: pageTitle,

  ogDescription: () =>
    product.value?.descricao?.slice(0, 160)
    || '',

  ogImage: () =>
    product.value?.imagens?.[0]?.url
    || ''
})


function addToCart() {
  if (!product.value) return

  cartStore.addItem(
    product.value,
    quantity.value
  )
}
</script>
