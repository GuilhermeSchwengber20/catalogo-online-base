export interface Settings {
  id: string
  nomeLoja: string
  logo: string | null
  telefoneWhatsapp: string
  email: string | null
  instagram: string | null
  facebook: string | null
  corPrimaria: string
  corSecundaria: string
  textoHome: string | null
  mostrarPrecos: boolean
  createdAt: string
  updatedAt: string
}

export interface PublicSettings {
  nomeLoja: string
  logo: string | null
  telefoneWhatsapp: string
  mostrarPrecos: boolean
  textoHome: string | null
}
