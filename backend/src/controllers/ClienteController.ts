import { Request, Response } from 'express';
import { ListClientesService } from '../services/cliente/ListClientesService';
import { GetClienteService } from '../services/cliente/GetClienteService';
import { UpdateClienteService } from '../services/cliente/UpdateClienteService';
import { GetClienteOrdersService } from '../services/cliente/GetClienteOrdersService';
import { updateClienteSchema } from '../schemas/clienteSchema';

export class ClienteController {
  constructor(
    private readonly listClientesService: ListClientesService,
    private readonly getClienteService: GetClienteService,
    private readonly updateClienteService: UpdateClienteService,
    private readonly getClienteOrdersService: GetClienteOrdersService,
  ) {}

  async list(req: Request, res: Response) {
    const clientes = await this.listClientesService.execute();
    res.json({ success: true, data: clientes });
  }

  async getById(req: Request, res: Response) {
    const cliente = await this.getClienteService.execute(req.params.id);
    res.json({ success: true, data: cliente });
  }

  async update(req: Request, res: Response) {
    const data = updateClienteSchema.parse(req.body);
    const cliente = await this.updateClienteService.execute(req.params.id, data);
    res.json({ success: true, data: cliente });
  }

  async getOrders(req: Request, res: Response) {
    const result = await this.getClienteOrdersService.execute(req.params.id);
    res.json({ success: true, data: result });
  }
}
