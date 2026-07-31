import type { Banner } from '~/types/banner'
import type { Category } from '~/types/category'
import type { Product } from '~/types/product'

import { CatalogoService } from '~/services/CatalogoService'

interface HomeData {
  banners: Banner[]
  categorias: Category[]
  produtos: Product[]
}

export function useCatalogHome() {
  return useAsyncData<HomeData>(
    'catalog-home',
    async () => {
      const response = await CatalogoService.getCatalogHome()

      if (!response.success) {
        throw new Error('Erro ao carregar página inicial')
      }

      return response.data as HomeData
    }
  )
}