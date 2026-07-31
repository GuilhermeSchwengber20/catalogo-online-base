import type { ApiResponse } from '~/types'
import type { Category } from '~/types/category'
import type { Product } from '~/types/product'
import type { PublicSettings } from '~/types/settings'


interface CatalogCategoryResponse extends Category {
  produtos: Product[]
}


export interface ProductQueryParams {
  category?: string
  search?: string
  page?: number
  limit?: number
}

export const CatalogoService = {
  async getCatalogHome() {
    const { $api } = useNuxtApp()
    return $api<ApiResponse<{ banners: unknown[], categorias: unknown[], produtos: Product[]}>>('/catalog/home')
  },

  async getProducts(params?: ProductQueryParams) {
    const { $api } = useNuxtApp()
    return $api<ApiResponse<Product[]>>('/catalog/products', { params })
  },

  async getCategory(slug: string, params?: { page?: number, limit?: number, search?: string }) {
    const { $api } = useNuxtApp()

    return $api<ApiResponse<CatalogCategoryResponse>>(`/catalog/categories/${slug}`, { params })
  },


  async getProductBySlug(slug: string) {
    const { $api } = useNuxtApp()
    return $api<ApiResponse<Product>>(`/catalog/products/${slug}`)
  },

  async getPublicSettings() {
    const { $api } = useNuxtApp();

    return $api<ApiResponse<PublicSettings>>('/catalog/settings')
  }
}
