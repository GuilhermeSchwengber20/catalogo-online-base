import { ConfiguracaoLojaRepository } from '../repositories/ConfiguracaoLojaRepository';
import { GetConfiguracaoService } from '../services/configuracao/GetConfiguracaoService';
import { UpdateConfiguracaoService } from '../services/configuracao/UpdateConfiguracaoService';
import { ConfiguracaoController } from '../controllers/ConfiguracaoController';

export function makeConfiguracaoController(): ConfiguracaoController {
  const repository = new ConfiguracaoLojaRepository();
  const getService = new GetConfiguracaoService(repository);
  const updateService = new UpdateConfiguracaoService(repository);
  return new ConfiguracaoController(getService, updateService);
}
