export function useAppPagination(options?: { page?: number, limit?: number }) {
  const page = ref(options?.page || 1)
  const limit = ref(options?.limit || 10)
  const total = ref(0)

  const totalPages = computed(() => Math.ceil(total.value / limit.value))

  function setPage(value: number) {
    if (value < 1) return
    if (value > totalPages.value) return
    page.value = value
  }

  function nextPage() {
    setPage(page.value + 1)
  }

  function prevPage() {
    setPage(page.value - 1)
  }

  return {
    page: readonly(page),
    limit: readonly(limit),
    total: readonly(total),
    totalPages,
    setPage,
    nextPage,
    prevPage
  }
}
