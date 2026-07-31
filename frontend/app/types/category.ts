export interface Category {
  id: string
  nome: string
  slug: string
  descricao: string | null
  imagem: string | null
  ordem: number
  ativo: boolean
  createdAt: string
  updatedAt: string
}

