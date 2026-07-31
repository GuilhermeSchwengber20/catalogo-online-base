export interface UpdateConfiguracaoLojaDTO {
  nomeLoja?: string | null;
  logo?: string | null;
  telefoneWhatsapp?: string | null;
  email?: string | null;
  instagram?: string | null;
  facebook?: string | null;
  corPrimaria?: string | null;
  corSecundaria?: string | null;
  textoHome?: string | null;
  mostrarPrecos?: boolean;
}


export interface PublicConfiguracaoLojaDTO {
  nomeLoja?: string | null;
  logo?: string | null;
  telefoneWhatsapp?: string | null;
  email?: string | null;
  instagram?: string | null;
  facebook?: string | null;
  mostrarPrecos?: boolean;

}