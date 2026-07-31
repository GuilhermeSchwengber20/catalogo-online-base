import { Request, Response } from 'express';
import { GetConfiguracaoService } from '../services/configuracao/GetConfiguracaoService';
import { UpdateConfiguracaoService } from '../services/configuracao/UpdateConfiguracaoService';
import { updateConfiguracaoSchema } from '../schemas/configuracaoSchema';

export class ConfiguracaoController {
  constructor(
    private readonly getConfiguracaoService: GetConfiguracaoService,
    private readonly updateConfiguracaoService: UpdateConfiguracaoService,
  ) {}

  async get(req: Request, res: Response) {
    const config = await this.getConfiguracaoService.execute();
    res.json({ success: true, data: config });
  }

  async update(req: Request, res: Response) {
    const data = updateConfiguracaoSchema.parse(req.body);
    const config = await this.updateConfiguracaoService.execute(data);
    res.json({ success: true, data: config });
  }
}
