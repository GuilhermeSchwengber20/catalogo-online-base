import { configuracaoLoja } from '../database/schema';

export interface IConfiguracaoLojaRepository {
  find(): Promise<typeof configuracaoLoja.$inferSelect | null>;
  update(data: Partial<typeof configuracaoLoja.$inferInsert>): Promise<typeof configuracaoLoja.$inferSelect>;
}
