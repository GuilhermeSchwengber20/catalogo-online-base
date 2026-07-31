export interface CreateBannerDTO {
  titulo?: string | null;
  subtitulo?: string | null;
  imagem: string;
  link?: string | null;
  ordem?: number;
}

export interface UpdateBannerDTO {
  titulo?: string | null;
  subtitulo?: string | null;
  imagem?: string;
  link?: string | null;
  ordem?: number;
}
