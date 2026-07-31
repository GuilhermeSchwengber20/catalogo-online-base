<template>
  <LayoutAppSection>
    <h1 class="text-xl font-semibold text-warm-900 mb-6">
      Carrinho
    </h1>

    <template v-if="!isEmpty">
      <div class="divide-y divide-warm-200">
        <CartItem
          v-for="item in items"
          :key="item.product.id"
          :item="item"
          @update-quantity="handleUpdateQuantity"
          @remove="handleRemove"
        />
      </div>

      <div class="mt-6">
        <CartSummary
          :subtotal="subtotal"
          :has-items="!isEmpty"
          @checkout="goToCheckout"
        />
      </div>
    </template>

    <SharedEmptyCatalog
      v-else
      message="Seu carrinho está vazio"
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
  </LayoutAppSection>
</template>

<script setup lang="ts">
const cartStore = useCartStore()
const { items, subtotal, isEmpty } = storeToRefs(cartStore)
const { updateQuantity, removeItem } = cartStore

function handleUpdateQuantity(productId: string, quantity: number) {
  updateQuantity(productId, quantity)
}

function handleRemove(productId: string) {
  removeItem(productId)
}

function goToCheckout() {
  navigateTo('/checkout')
}
</script>
