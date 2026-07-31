import { IProdutoRepository } from '../../repositories/IProdutoRepository';
import { IProdutoImagemRepository } from '../../repositories/IProdutoImagemRepository';
import { AppError } from '../../shared/AppError';
import { slugify } from '../../shared/utils';
import { CreateProdutoDTO } from '../../dtos/ProdutoDTO';

export class CreateProdutoService {
  constructor(
    private readonly produtoRepository: IProdutoRepository,
    private readonly produtoImagemRepository: IProdutoImagemRepository,
  ) {}

  async execute(data: CreateProdutoDTO) {
    const slug = slugify(data.nome);

    const existing = await this.produtoRepository.findBySlug(slug);

    if (existing) {
      throw new AppError('Já existe um produto com este slug', 409);
    }

    if (!data.imagens || data.imagens.length === 0) {
    throw new AppError('Produto deve ter pelo menos uma imagem', 422);
    }

    if (data.precoPromocional && Number(data.precoPromocional) > Number(data.preco)) {
      throw new AppError('Preço promocional não pode ser maior que o preço original', 422);
    }

    const produto = await this.produtoRepository.create({
      categoriaId: data.categoriaId,
      nome: data.nome,
      slug,
      descricao: data.descricao ?? null,
      preco: data.preco,
      precoPromocional: data.precoPromocional ?? null,
      cor: data.cor ?? null,
      tamanho: data.tamanho ?? null,
      estoque: data.estoque ?? 0,
      ativo: true,
    });

    if (data.imagens && data.imagens.length > 0) {
      for (const img of data.imagens) {
        await this.produtoImagemRepository.create({
          produtoId: produto.id,
          url: img.url,
          publicId: img.publicId,
          ordem: img.ordem ?? 0,
        });
      }
    }

    return produto;
  }
}
