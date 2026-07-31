import { Request, Response } from 'express';
import { ListCategoriasService } from '../services/categoria/ListCategoriasService';
import { CreateCategoriaService } from '../services/categoria/CreateCategoriaService';
import { UpdateCategoriaService } from '../services/categoria/UpdateCategoriaService';
import { ToggleCategoriaStatusService } from '../services/categoria/ToggleCategoriaStatusService';
import { createCategoriaSchema, updateCategoriaSchema } from '../schemas/categoriaSchema';
import { GetCategoriaService } from '../services/categoria/GetCategoriaService';

export class CategoriaController {
  constructor(
    private readonly listCategoriasService: ListCategoriasService,
    private readonly getCategoriaService: GetCategoriaService,
    private readonly createCategoriaService: CreateCategoriaService,
    private readonly updateCategoriaService: UpdateCategoriaService,
    private readonly toggleCategoriaStatusService: ToggleCategoriaStatusService,
  ) {}

  async list(req: Request, res: Response) {
    const categorias = await this.listCategoriasService.execute();
    res.json({ success: true, data: categorias });
  }

  async create(req: Request, res: Response) {
    const data = createCategoriaSchema.parse(req.body);
    const categoria = await this.createCategoriaService.execute(data);
    res.status(201).json({ success: true, data: categoria });
  }

  async update(req: Request, res: Response) {
    const data = updateCategoriaSchema.parse(req.body);
    const categoria = await this.updateCategoriaService.execute(req.params.id, data);
    res.json({ success: true, data: categoria });
  }

  async toggleStatus(req: Request, res: Response) {
    const categoria = await this.toggleCategoriaStatusService.execute(req.params.id);
    res.json({ success: true, data: categoria });
  }

  async getById(req: Request, res: Response) {
    const categoria = await this.getCategoriaService.execute(req.params.id);
    res.json({ success: true, data: categoria})
  }
}
