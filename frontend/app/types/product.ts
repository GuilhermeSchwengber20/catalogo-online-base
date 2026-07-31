import type { Category } from "./category"

export interface Product {
  id: string
  nome: string
  slug: string
  descricao: string
  preco: number
  precoPromocional: number | null
  cor: string | null
  tamanho: string | null
  estoque: number
  ativo: boolean
  imagens?: ProductImage[]
  createdAt: string
  updatedAt: string
  categoria: Category
}

export interface ProductImage {
  id: string
  produtoId: string
  url: string
  publicId: string
  ordem: number
  createdAt: string
  updatedAt: string
}
