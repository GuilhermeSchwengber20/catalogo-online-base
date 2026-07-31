import { CatalogoService } from '~/services/CatalogoService'
import type { Product } from '~/types/product'

export function useCatalogProduct(slug: Ref<string>) {
  return useAsyncData<Product>(
    `catalog-product-${slug.value}`,
    async () => {
      const response = await CatalogoService.getProductBySlug(slug.value)

      if (!response.success) {
        throw new Error('Produto não encontrado')
      }

      return response.data
    },
    {
      watch: [slug]
    }
  )
}