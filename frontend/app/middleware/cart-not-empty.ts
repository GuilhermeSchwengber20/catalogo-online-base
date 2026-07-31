export default defineNuxtRouteMiddleware(() => {
  const cartStore = useCartStore()
  if (cartStore.isEmpty) {
    return navigateTo('/cart')
  }
})
