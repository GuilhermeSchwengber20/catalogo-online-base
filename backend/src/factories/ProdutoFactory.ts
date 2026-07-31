import { ProdutoRepository } from '../repositories/ProdutoRepository';
import { ProdutoImagemRepository } from '../repositories/ProdutoImagemRepository';
import { ListProdutosService } from '../services/produto/ListProdutosService';
import { GetProdutoService } from '../services/produto/GetProdutoService';
import { CreateProdutoService } from '../services/produto/CreateProdutoService';
import { UpdateProdutoService } from '../services/produto/UpdateProdutoService';
import { ToggleProdutoStatusService } from '../services/produto/ToggleProdutoStatusService';
import { UpdateEstoqueService } from '../services/produto/UpdateEstoqueService';
import { DeleteProdutoImagemService } from '../services/produto/DeleteProdutoImagemService';
import { ProdutoController } from '../controllers/ProdutoController';
import { CloudinaryService } from '@/services/upload/CloudinaryService';

export function makeProdutoController(): ProdutoController {
  const produtoRepository = new ProdutoRepository();

  const cloudinaryService = new CloudinaryService()
  const produtoImagemRepository = new ProdutoImagemRepository(cloudinaryService);

  const listService = new ListProdutosService(produtoRepository);
  const getService = new GetProdutoService(produtoRepository, produtoImagemRepository);
  const createService = new CreateProdutoService(produtoRepository, produtoImagemRepository);
  const updateService = new UpdateProdutoService(produtoRepository, produtoImagemRepository);
  const toggleService = new ToggleProdutoStatusService(produtoRepository);
  const estoqueService = new UpdateEstoqueService(produtoRepository);
  const deleteImagemService = new DeleteProdutoImagemService(produtoImagemRepository);

  return new ProdutoController(
    listService,
    getService,
    createService,
    updateService,
    toggleService,
    estoqueService,
    deleteImagemService,
  );
}
