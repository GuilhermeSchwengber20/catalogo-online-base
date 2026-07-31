export const ORDER_STATUS = {
  ABERTO: 'ABERTO',
  EM_COMPRA: 'EM_COMPRA',
  AGUARDANDO_CLIENTE: 'AGUARDANDO_CLIENTE',
  CONCLUIDO: 'CONCLUIDO',
  CANCELADO: 'CANCELADO',
} as const;

export const ORDER_ORIGIN = {
  CATALOGO: 'CATALOGO',
  MANUAL: 'MANUAL',
} as const;

export type OrderStatus = (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS];
export type OrderOrigin = (typeof ORDER_ORIGIN)[keyof typeof ORDER_ORIGIN];
