import type { Product } from '~/types/product'
import { ProductService } from '~/services/ProductService'
import type { ImageProductSchema, ProductFormData } from '~/schemas/product.schema'

export function useAdminProducts() {
  const products = ref<Product[]>([])
  const loading = ref(false)
  const saving = ref(false)
  const error = ref<string | null>(null)

  async function fetchProducts(params?: { category?: string, search?: string, page?: number, limit?: number }) {
    loading.value = true
    error.value = null

    try {
      const response = await ProductService.getAll(params)
      if (response.success) {
        products.value = response.data
      }
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : 'Erro ao carregar produtos'
    } finally {
      loading.value = false
    }
  }

  async function createProduct(data: ProductFormData, imagens?: ImageProductSchema[]) {
    saving.value = true
    error.value = null

    try {
      await ProductService.create({
        nome: data.nome,
        categoriaId: data.categoriaId,
        descricao: data.descricao || undefined,
        preco: data.preco,
        precoPromocional: data.precoPromocional || undefined,
        cor: data.cor || undefined,
        tamanho: data.tamanho || undefined,
        estoque: data.estoque || 0,
        imagens: (imagens || []).map(image => ({ url: image.url, ordem: image.ordem || 0, publicId: image.publicId }))
      })
      await fetchProducts()
      return true
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : 'Erro ao criar produto'
      return false
    } finally {
      saving.value = false
    }
  }

  async function updateProduct(id: string, data: ProductFormData, imagens?: ImageProductSchema[]) {
    saving.value = true
    error.value = null

    try {
      await ProductService.update(id, {
        nome: data.nome,
        categoriaId: data.categoriaId,
        descricao: data.descricao || undefined,
        preco: data.preco,
        precoPromocional: data.precoPromocional || null,
        cor: data.cor || undefined,
        tamanho: data.tamanho || undefined,
        estoque: data.estoque || 0,
        imagens: (imagens || []).map(image => ({ url: image.url, ordem: image.ordem || 0, publicId: image.publicId }))

      })
      await fetchProducts()
      return true
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : 'Erro ao atualizar produto'
      return false
    } finally {
      saving.value = false
    }
  }

  async function toggleProductStatus(id: string) {
    error.value = null

    try {
      await ProductService.toggleStatus(id)
      await fetchProducts()
      return true
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : 'Erro ao alterar status'
      return false
    }
  }

  return {
    products,
    loading,
    saving,
    error,
    fetchProducts,
    createProduct,
    updateProduct,
    toggleProductStatus
  }
}
