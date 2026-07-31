export default defineNuxtRouteMiddleware(() => {
  const authStore = useAuthStore()
  authStore.init()
  console.log(authStore);
  if (!authStore.isAuthenticated) {
    return navigateTo('/admin/login')
  }
})
