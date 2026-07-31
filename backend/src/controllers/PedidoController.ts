import { Request, Response } from 'express';
import { ListPedidosService } from '../services/pedido/ListPedidosService';
import { GetPedidoService } from '../services/pedido/GetPedidoService';
import { CreatePedidoManualService } from '../services/pedido/CreatePedidoManualService';
import { CreatePedidoCatalogService } from '../services/pedido/CreatePedidoCatalogService';
import { UpdatePedidoStatusService } from '../services/pedido/UpdatePedidoStatusService';
import { createPedidoManualSchema, createPedidoCatalogSchema, updatePedidoStatusSchema } from '../schemas/pedidoSchema';

export class PedidoController {
  constructor(
    private readonly listPedidosService: ListPedidosService,
    private readonly getPedidoService: GetPedidoService,
    private readonly createPedidoManualService: CreatePedidoManualService,
    private readonly createPedidoCatalogService: CreatePedidoCatalogService,
    private readonly updatePedidoStatusService: UpdatePedidoStatusService,
  ) {}

  async list(req: Request, res: Response) {
    const { status, cliente, cidade, origem } = req.query;
    const pedidos = await this.listPedidosService.execute({
      status: status as string,
      cliente: cliente as string,
      cidade: cidade as string,
      origem: origem as string,
    });
    res.json({ success: true, data: pedidos });
  }

  async getById(req: Request, res: Response) {
    const pedido = await this.getPedidoService.execute(req.params.id);
    res.json({ success: true, data: pedido });
  }

  async createManual(req: Request, res: Response) {
    const data = createPedidoManualSchema.parse(req.body);
    const pedido = await this.createPedidoManualService.execute(data);
    res.status(201).json({ success: true, data: pedido });
  }

  async createCatalog(req: Request, res: Response) {
    const data = createPedidoCatalogSchema.parse(req.body);
    const result = await this.createPedidoCatalogService.execute(data);
    res.status(201).json({ success: true, data: result });
  }

  async updateStatus(req: Request, res: Response) {
    const data = updatePedidoStatusSchema.parse(req.body);
    const pedido = await this.updatePedidoStatusService.execute(req.params.id, data.status);
    res.json({ success: true, data: pedido });
  }
}
