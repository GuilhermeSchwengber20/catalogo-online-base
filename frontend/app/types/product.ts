import type { Category } from "./category"


/*
Melhorar essa interface (Esta usando tanto para o metodo de create/update quanto para o retorno de getAll/getById que possui retornos diferente)
create/update precisa enviar o categoriaId, enquanto o retorno de getAll/getById retorna a categoria completa.
*/ 
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
  categoriaId: string
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
