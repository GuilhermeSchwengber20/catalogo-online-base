import type { Category } from '~/types/category'
import type { Product } from '~/types/product'
import { CatalogoService } from '~/services/CatalogoService'

// melhorar isso futuramente
interface CatalogCategoryResponse extends Category {
  produtos: Product[]
}

export function useCatalogCategory(
  slug: MaybeRef<string>,
  page = 1,
  limit = 10
) {

  return useAsyncData(
    `catalog-category-${toValue(slug)}-${page}`,
    async () => {

      const response = await CatalogoService.getCategory(
        toValue(slug),
        {
          page,
          limit
        }
      )

      if (!response.success) {
        throw createError({
          statusCode: 404,
          statusMessage: 'Categoria não encontrada'
        })
      }

      return response.data as CatalogCategoryResponse
    },
    {
      watch: [
        () => toValue(slug)
      ]
    }
  )
}