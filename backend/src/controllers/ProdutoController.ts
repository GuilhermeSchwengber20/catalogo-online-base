import { Request, Response } from 'express';
import { ListProdutosService } from '../services/produto/ListProdutosService';
import { GetProdutoService } from '../services/produto/GetProdutoService';
import { CreateProdutoService } from '../services/produto/CreateProdutoService';
import { UpdateProdutoService } from '../services/produto/UpdateProdutoService';
import { ToggleProdutoStatusService } from '../services/produto/ToggleProdutoStatusService';
import { UpdateEstoqueService } from '../services/produto/UpdateEstoqueService';
import { DeleteProdutoImagemService } from '../services/produto/DeleteProdutoImagemService';
import { createProdutoSchema, updateProdutoSchema } from '../schemas/produtoSchema';

export class ProdutoController {
  constructor(
    private readonly listProdutosService: ListProdutosService,
    private readonly getProdutoService: GetProdutoService,
    private readonly createProdutoService: CreateProdutoService,
    private readonly updateProdutoService: UpdateProdutoService,
    private readonly toggleProdutoStatusService: ToggleProdutoStatusService,
    private readonly updateEstoqueService: UpdateEstoqueService,
    private readonly deleteProdutoImagemService: DeleteProdutoImagemService,
  ) {}

  async list(req: Request, res: Response) {
    const { category, search, active, page, limit } = req.query;
    const produtos = await this.listProdutosService.execute({
      category: category as string,
      search: search as string,
      active: active === 'true' ? true : active === 'false' ? false : undefined,
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
    });
    res.json({ success: true, data: produtos });
  }

  async getById(req: Request, res: Response) {
    const produto = await this.getProdutoService.execute(req.params.id);
    res.json({ success: true, data: produto });
  }

  async create(req: Request, res: Response) {
    const data = createProdutoSchema.parse(req.body);
    const produto = await this.createProdutoService.execute(data);
    res.status(201).json({ success: true, data: produto });
  }

  async update(req: Request, res: Response) {
    const data = updateProdutoSchema.parse(req.body);
    const produto = await this.updateProdutoService.execute(req.params.id, data);
    res.json({ success: true, data: produto });
  }

  async toggleStatus(req: Request, res: Response) {
    const produto = await this.toggleProdutoStatusService.execute(req.params.id);
    res.json({ success: true, data: produto });
  }

  async updateEstoque(req: Request, res: Response) {
    const { quantidade } = req.body;
    const produto = await this.updateEstoqueService.execute(req.params.id, quantidade);
    res.json({ success: true, data: produto });
  }

  async deleteImage(req: Request, res: Response) {
    await this.deleteProdutoImagemService.execute(req.params.imageId);
    res.status(204).send();
  }
}
