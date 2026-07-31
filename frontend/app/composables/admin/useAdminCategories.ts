import type { Category } from '~/types/category'
import { CategoryService } from '~/services/CategoryService'
import type { CategoryFormData } from '~/schemas/category.schema'

export function useAdminCategories() {
  const categories = ref<Category[]>([])
  const loading = ref(false)
  const saving = ref(false)
  const error = ref<string | null>(null)

  async function fetchCategories() {
    loading.value = true
    error.value = null

    try {
      const response = await CategoryService.getAll()
      if (response.success) {
        categories.value = response.data
      }
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : 'Erro ao carregar categorias'
    } finally {
      loading.value = false
    }
  }

  async function createCategory(data: CategoryFormData) {
    saving.value = true
    error.value = null

    try {
      await CategoryService.create({
        nome: data.nome,
        descricao: data.descricao || undefined,
        ordem: data.ordem || 0
      })
      await fetchCategories()
      return true
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : 'Erro ao criar categoria'
      return false
    } finally {
      saving.value = false
    }
  }

  async function updateCategory(id: string, data: CategoryFormData) {
    saving.value = true
    error.value = null

    try {
      await CategoryService.update(id, {
        nome: data.nome,
        descricao: data.descricao || undefined,
        ordem: data.ordem || 0
      })
      await fetchCategories()
      return true
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : 'Erro ao atualizar categoria'
      return false
    } finally {
      saving.value = false
    }
  }

  async function toggleCategoryStatus(id: string) {
    error.value = null

    try {
      await CategoryService.toggleStatus(id)
      await fetchCategories()
      return true
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : 'Erro ao alterar status'
      return false
    }
  }

  return {
    categories,
    loading,
    saving,
    error,
    fetchCategories,
    createCategory,
    updateCategory,
    toggleCategoryStatus
  }
}
