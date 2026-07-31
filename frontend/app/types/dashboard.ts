export interface DashboardData {
  pedidos: {
    total: number
    porStatus: Record<string, number>
  }
  clientes: {
    total: number
  }
  produtos: {
    total: number
    ativos: number
    inativos: number
  }
  estoque: {
    total: number
    baixo: number
    semEstoque: number
  }
}
