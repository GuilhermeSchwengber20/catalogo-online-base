export interface Banner {
  id: string
  titulo: string | null
  subtitulo: string | null
  imagem: string
  link: string | null
  ordem: number
  ativo: boolean
  createdAt: string
  updatedAt: string
}
