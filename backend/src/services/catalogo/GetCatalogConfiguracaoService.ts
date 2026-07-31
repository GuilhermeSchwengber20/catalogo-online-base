import { PublicConfiguracaoLojaDTO } from '../../dtos/ConfiguracaoLojaDTO';


import { IConfiguracaoLojaRepository } from '../../repositories/IConfiguracaoLojaRepository';

export class GetCatalogConfiguracaoService {
  constructor(private readonly configuracaoRepository: IConfiguracaoLojaRepository) {}
    async execute(): Promise<PublicConfiguracaoLojaDTO | null> {
        const settings = await this.configuracaoRepository.find();

        if(!settings) return null;

        return {
            nomeLoja: settings.nomeLoja,
            telefoneWhatsapp: settings.telefoneWhatsapp,
            instagram: settings.instagram,
            facebook: settings.facebook,
            mostrarPrecos: settings.mostrarPrecos,
            logo: settings.logo
        }
    }
}
