import { CategoriaRepository } from '../repositories/CategoriaRepository';
import { ProdutoRepository } from '../repositories/ProdutoRepository';
import { ListCategoriasService } from '../services/categoria/ListCategoriasService';
import { CreateCategoriaService } from '../services/categoria/CreateCategoriaService';
import { UpdateCategoriaService } from '../services/categoria/UpdateCategoriaService';
import { ToggleCategoriaStatusService } from '../services/categoria/ToggleCategoriaStatusService';
import { CategoriaController } from '../controllers/CategoriaController';
import { GetCategoriaService } from '@/services/categoria/GetCategoriaService';

export function makeCategoriaController(): CategoriaController {
  const categoriaRepository = new CategoriaRepository();
  const produtoRepository = new ProdutoRepository();

  const listService = new ListCategoriasService(categoriaRepository);
  const getService = new GetCategoriaService(categoriaRepository)
  const createService = new CreateCategoriaService(categoriaRepository);
  const updateService = new UpdateCategoriaService(categoriaRepository);
  const toggleService = new ToggleCategoriaStatusService(categoriaRepository, produtoRepository);

  return new CategoriaController(listService, getService, createService, updateService, toggleService);
}
