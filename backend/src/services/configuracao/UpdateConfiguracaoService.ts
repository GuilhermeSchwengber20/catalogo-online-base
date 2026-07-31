import { IConfiguracaoLojaRepository } from '../../repositories/IConfiguracaoLojaRepository';
import { UpdateConfiguracaoLojaDTO } from '../../dtos/ConfiguracaoLojaDTO';

export class UpdateConfiguracaoService {
  constructor(private readonly configuracaoRepository: IConfiguracaoLojaRepository) {}

  async execute(data: UpdateConfiguracaoLojaDTO) {
    return this.configuracaoRepository.update({
      ...data,
      updatedAt: new Date(),
    });
  }
}
