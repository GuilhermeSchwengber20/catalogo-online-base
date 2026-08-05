<template>
  <div>
    <template v-if="pending">
      <div class="aspect-[16/9] sm:aspect-[21/9] bg-warm-100 animate-pulse" />

      <LayoutAppSection>
        <div class="flex gap-4 pb-2">
          <div
            v-for="i in 4"
            :key="i"
            class="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-warm-100 shrink-0 animate-pulse"
          />
        </div>
      </LayoutAppSection>

      <LayoutAppSection>
        <SharedLoadingSection :count="6" />
      </LayoutAppSection>
    </template>

    <template v-else-if="error">
      <LayoutAppSection>
        <SharedErrorDisplay
          :message="error?.message"
          retryable
          @retry="refresh"
        />
      </LayoutAppSection>
    </template>

    <template v-else-if="data">
      <CatalogBannerCarousel
        v-if="data.banners.length"
        :banners="data.banners"
      />

      <LayoutAppSection v-if="data.categorias.length">
        <h2 class="text-lg font-semibold text-warm-900 mb-4">
          Categorias
        </h2>

        <div class="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory">
          <CatalogCategoryCard
            v-for="categoria in data.categorias"
            :key="categoria.id"
            :name="categoria.nome"
            :slug="categoria.slug"
            :image="categoria.imagem"
            class="snap-start"
          />
        </div>
      </LayoutAppSection>

      <LayoutAppSection v-if="data.produtos.length">
        <h2 class="text-lg font-semibold text-warm-900 mb-4">
          Novidades
        </h2>

        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          <CatalogProductCard
            v-for="produto in data.produtos"
            :key="produto.id"
            :name="produto.nome"
            :slug="produto.slug"
            :price="produto.preco"
            :promotional-price="produto.precoPromocional"
            :image="produto.imagens?.[0]?.url || ''"
            @add="openDrawer(produto)"
          />
        </div>
      </LayoutAppSection>

      <LayoutAppSection v-if="!data.produtos.length && !data.categorias.length && !data.banners.length">
        <SharedEmptyCatalog />
      </LayoutAppSection>
    </template>

    <LazyCatalogProductPurchaseDrawer
      v-if="selectedProduct && isMobile"
      :open="drawerOpen"
      :product="selectedProduct"
      @close="drawerOpen = false"
      @add-to-cart="handleAddToCart"
    />
    <LazyCatalogProductPurchaseDialog
      v-else-if="selectedProduct && !isMobile"
      v-model:open="modalOpen"
      :product="selectedProduct"
      @close="selectedProduct = null"
      @add-to-cart="handleAddToCart"
    />
  </div>
</template>

<script setup lang="ts">
import type { Product } from '~/types/product'
const {data, pending, error, refresh } = await useCatalogHome()
const { settings } = useCatalogSettings();
const { isMobile } = useDevice()

const drawerOpen = ref(false)
const modalOpen = ref(false)
const selectedProduct = ref<Product | null>(null)

const cartStore = useCartStore()


useSeoMeta({
  title: () => settings.value?.nomeLoja ? `${settings.value?.nomeLoja} - Catálogo Online` : 'Donna Decor Imports - Catálogo Online',
  description: "Catálogo online para lojas de roupas e importados - confira nossos produtos",
  ogTitle: settings.value?.nomeLoja
})

function openDrawer(product: Product) {
  selectedProduct.value = product

  if(isMobile) {
    drawerOpen.value = true
    return;
  }
  modalOpen.value = true
  
}

function handleAddToCart(product: Product, quantity: number) {
  cartStore.addItem(product, quantity)
}
</script>
