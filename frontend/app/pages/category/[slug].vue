<template>
  <div>
    <template v-if="loading">
      <LayoutAppSection>
        <USkeleton class="h-6 w-48 mb-4 rounded" />
        <SharedLoadingSection :count="6" />
      </LayoutAppSection>
    </template>

    <template v-else-if="error">
      <LayoutAppSection>
        <SharedErrorDisplay
          :message="error?.message"
          retryable
          @retry="loadCategory"
        />
      </LayoutAppSection>
    </template>

    <template v-else>
      <LayoutAppSection>
        <UBreadcrumb
          :items="[
            { label: 'Início', to: '/' },
            { label: categoryName, to: '' }
          ]"
          class="mb-4"
        />

        <div class="flex items-center justify-between gap-4 mb-6">
          <h1 class="text-xl font-semibold text-warm-900">
            {{ categoryName }}
          </h1>
        </div>

        <CatalogSearchBar
          v-model="searchQuery"
          class="mb-6"
        />

        <div
          v-if="filteredProducts.length"
          class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          <CatalogProductCard
            v-for="produto in filteredProducts"
            :key="produto.id"
            :name="produto.nome"
            :slug="produto.slug"
            :price="produto.preco"
            :promotional-price="produto.precoPromocional"
            :image="produto.imagens?.[0]?.url || ''"
            @add="openDrawer(produto)"
          />
        </div>

        <SharedEmptyCatalog
          v-else
          message="Nenhum produto encontrado nesta categoria."
        />

        <UPagination
          v-if="totalPages > 1"
          v-model="currentPage"
          :total="total"
          :page="currentPage"
          :active="currentPage"
          size="sm"
          class="mt-8 justify-center"
        />
      </LayoutAppSection>
    </template>

    <CatalogProductPurchaseDrawer
      :open="drawerOpen"
      :product="selectedProduct!"
      @close="drawerOpen = false"
      @add-to-cart="handleAddToCart"
    />
  </div>
</template>
<script setup lang="ts">
import type { Product } from '~/types/product'

const route = useRoute()

const slug = computed(() =>
  route.params.slug as string
)


const currentPage = ref(1)

const ITEMS_PER_PAGE = 10


const {
  data,
  pending: loading,
  error,
  refresh: loadCategory
} = await useCatalogCategory(
  slug,
  currentPage.value,
  ITEMS_PER_PAGE
)


const categoryName = computed(() =>
  data.value?.nome ?? ''
)


const products = computed(() =>
  data.value?.produtos ?? []
)


const searchQuery = ref('')


const total = computed(() =>
  products.value.length
)


const totalPages = computed(() =>
  Math.ceil(total.value / ITEMS_PER_PAGE)
)


const filteredProducts = computed(() => {

  if (!searchQuery.value) {
    return products.value
  }


  const query =
    searchQuery.value.toLowerCase()


  return products.value.filter(product =>
    product.nome
      .toLowerCase()
      .includes(query)
  )

})


const drawerOpen = ref(false)

const selectedProduct =
  ref<Product | null>(null)


const cartStore = useCartStore()


const pageTitle = computed(() =>
  categoryName.value
    ? `${categoryName.value} - Dona Decor`
    : 'Categoria'
)


useSeoMeta({
  title: pageTitle,
  description: () =>
    `Confira os produtos da categoria ${categoryName.value} na Dona Decor Imports.`
})


function openDrawer(product: Product) {

  selectedProduct.value = product

  drawerOpen.value = true

}


function handleAddToCart(
  product: Product,
  quantity:number
) {

  cartStore.addItem(
    product,
    quantity
  )

}
</script>
