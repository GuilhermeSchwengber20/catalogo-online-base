<template>
  <UApp>
    <LayoutAppHeader
      :cart-total="cartTotal"
      @toggle-menu="menuOpen = !menuOpen"
      @toggle-search="searchVisible = !searchVisible"
      @toggle-cart="cartOpen = !cartOpen"
    />

    <div
      v-if="searchVisible"
      class="px-4 py-2 lg:hidden"
    >
      <CatalogSearchBar v-model="searchQuery" />
    </div>

    <UMain>
      <slot />
    </UMain>

    <LayoutAppFooter />

    <LayoutNavigationDrawer
      :open="menuOpen"
      :cart-total="cartTotal"
      @close="menuOpen = false"
    />

    <LazyCartDrawer
      :open="cartOpen"
      :items="items"
      :subtotal="subtotal"
      @close="cartOpen = false"
      @checkout="navigateTo('/checkout'); cartOpen = false"
    />
  </UApp>
</template>

<script setup lang="ts">
const menuOpen = ref(false)
const cartOpen = ref(false)
const searchVisible = ref(false)
const searchQuery = ref('')

const cartStore = useCartStore()
const { items, totalItems: cartTotal, subtotal } = storeToRefs(cartStore)
</script>
