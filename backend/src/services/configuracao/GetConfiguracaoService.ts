import { IConfiguracaoLojaRepository } from '../../repositories/IConfiguracaoLojaRepository';

export class GetConfiguracaoService {
  constructor(private readonly configuracaoRepository: IConfiguracaoLojaRepository) {}

  async execute() {
    return this.configuracaoRepository.find();
  }
}
