export interface CreatePedidoManualDTO {
  clienteId?: string;
  cliente?: {
    nome: string;
    telefone: string;
    email?: string | null;
    cidade?: string | null;
  };
  itens: {
    produtoId: string;
    quantidade: number;
  }[];
  observacaoInterna?: string | null;
}

export interface CreatePedidoCatalogDTO {
  cliente: {
    nome: string;
    telefone: string;
    email?: string | null;
    cidade?: string | null;
  };
  itens: {
    produtoId: string;
    quantidade: number;
  }[];
  observacaoCliente?: string | null;
}

export interface UpdatePedidoStatusDTO {
  status: string;
}
