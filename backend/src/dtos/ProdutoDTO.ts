export interface CreateProdutoDTO {
  categoriaId: string;
  nome: string;
  descricao?: string | null;
  preco: number;
  precoPromocional?: number | null;
  cor?: string | null;
  tamanho?: string | null;
  estoque?: number;
  imagens?: { url: string; publicId: string; ordem?: number }[];
}

export interface UpdateProdutoDTO {
  categoriaId?: string;
  nome?: string;
  slug?: string;
  descricao?: string | null;
  preco?: number;
  precoPromocional?: number | null;
  cor?: string | null;
  tamanho?: string | null;
  estoque?: number;
  imagens?: { url: string; publicId: string; ordem?: number }[];


}
