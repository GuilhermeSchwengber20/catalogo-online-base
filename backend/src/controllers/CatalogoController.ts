import { GetCatalogConfiguracaoService } from '../services/catalogo/GetCatalogConfiguracaoService';
import { Request, Response } from 'express';
import { GetHomeService } from '../services/catalogo/GetHomeService';
import { ListCatalogProdutosService } from '../services/catalogo/ListCatalogProdutosService';
import { GetCatalogProdutoService } from '../services/catalogo/GetCatalogProdutoService';
import { GetCatalogCategoriaService } from '@/services/catalogo/GetCatalogCategoriaService';

export class CatalogoController {
  constructor(
    private readonly getHomeService: GetHomeService,
    private readonly listCatalogProdutosService: ListCatalogProdutosService,
    private readonly getCatalogProdutoService: GetCatalogProdutoService,
    private readonly getCatalogConfiguracaoService: GetCatalogConfiguracaoService,
    private readonly getCatalogCategoriaService: GetCatalogCategoriaService
  ) {}

  async home(req: Request, res: Response) {
    const data = await this.getHomeService.execute();
    res.json({ success: true, data });
  }

  async listProducts(req: Request, res: Response) {
    const { category, search, page, limit } = req.query;
    const result = await this.listCatalogProdutosService.execute(
      category as string,
      search as string,
      page ? Number(page) : undefined,
      limit ? Number(limit) : undefined,
    );
    res.json({ success: true, data: result.produtos, total: result.total });
  }

  async getProduct(req: Request, res: Response) {
    const produto = await this.getCatalogProdutoService.execute(req.params.slug);
    res.json({ success: true, data: produto });
  }

  async getCategory(req: Request, res: Response) {
    const response = await this.getCatalogCategoriaService.execute(req.params.slug)
    res.json({ success: true, data: response})
  }

  async getPublicSettings(req: Request, res: Response) {
      const settings = await this.getCatalogConfiguracaoService.execute()

      res.json({ success: true, data: settings })
  }
}
