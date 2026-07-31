export interface CreateCategoriaDTO {
  nome: string;
  descricao?: string | null;
  imagem?: string | null;
  ordem?: number;
}

export interface UpdateCategoriaDTO {
  nome?: string;
  slug?: string;
  descricao?: string | null;
  imagem?: string | null;
  ordem?: number;
}
