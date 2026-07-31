import { ConfiguracaoLojaRepository } from './../repositories/ConfiguracaoLojaRepository';
import { BannerRepository } from '../repositories/BannerRepository';
import { CategoriaRepository } from '../repositories/CategoriaRepository';
import { ProdutoRepository } from '../repositories/ProdutoRepository';
import { ProdutoImagemRepository } from '../repositories/ProdutoImagemRepository';
import { GetHomeService } from '../services/catalogo/GetHomeService';
import { ListCatalogProdutosService } from '../services/catalogo/ListCatalogProdutosService';
import { GetCatalogProdutoService } from '../services/catalogo/GetCatalogProdutoService';
import { CatalogoController } from '../controllers/CatalogoController';
import { CloudinaryService } from '../services/upload/CloudinaryService';
import { GetCatalogConfiguracaoService } from '../services/catalogo/GetCatalogConfiguracaoService';
import { GetCatalogCategoriaService } from '@/services/catalogo/GetCatalogCategoriaService';

export function makeCatalogoController(): CatalogoController {
  const cloudinaryService = new CloudinaryService()
  const bannerRepository = new BannerRepository();
  const categoriaRepository = new CategoriaRepository();
  const produtoRepository = new ProdutoRepository();
  const produtoImagemRepository = new ProdutoImagemRepository(cloudinaryService);
  const configuracaoLojaRepository = new ConfiguracaoLojaRepository()

  const getCatalogHomeService = new GetHomeService(bannerRepository, categoriaRepository, produtoRepository);
  const listCatalogProductService = new ListCatalogProdutosService(produtoRepository);
  const getCatalogProductService = new GetCatalogProdutoService(produtoRepository, produtoImagemRepository);
  const getCatalogCategoriaService = new GetCatalogCategoriaService(categoriaRepository, produtoRepository)

  const getCatalogoConfigService = new GetCatalogConfiguracaoService(configuracaoLojaRepository)
  

  return new CatalogoController(getCatalogHomeService, listCatalogProductService, getCatalogProductService, getCatalogoConfigService, getCatalogCategoriaService);
}
