import { eq } from 'drizzle-orm';
import { db } from './connection';
import { categorias, produtos, produtoImagens } from '@/database/schema';

const products = [
  {
    nome: 'Vestido Floral Verão',
    descricao:
      'Vestido leve e confortável com estampa floral, ideal para os dias quentes. Tecido de alta qualidade com caimento perfeito.',
    preco: 129.90,
    precoPromocional: 99.90,
    cor: 'Azul',
    tamanho: 'M',
    estoque: 15,
    slug: 'vestido-floral-verao',
    images: [
      'https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&h=800&fit=crop',
    ],
  },
  {
    nome: 'Blusa Elegante Plus Size',
    descricao:
      'Blusa moderna com design exclusivo, perfeita para o dia a dia ou ocasiões especiais. Modelagem confortável e elegante.',
    preco: 89.90,
    precoPromocional: null,
    cor: 'Branco',
    tamanho: 'GG',
    estoque: 20,
    slug: 'blusa-elegante-plus-size',
    images: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1554568218-0f1715e72254?w=600&h=800&fit=crop',
    ],
  },
  {
    nome: 'Calça Jeans Slim',
    descricao:
      'Calça jeans slim de alta qualidade, com elastano para maior conforto. Modelagem moderna que valoriza a silhueta.',
    preco: 149.90,
    precoPromocional: 129.90,
    cor: 'Azul Escuro',
    tamanho: '40',
    estoque: 10,
    slug: 'calca-jeans-slim',
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1604176354204-9268737828e4?w=600&h=800&fit=crop',
    ],
  },
  {
    nome: 'Conjunto Academia Feminino',
    descricao:
      'Conjunto top e legging em tecido respirável, ideal para atividades físicas. Alta compressão e conforto.',
    preco: 79.90,
    precoPromocional: null,
    cor: 'Preto',
    tamanho: 'P',
    estoque: 25,
    slug: 'conjunto-academia-feminino',
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1518314916380-0f8cce6b2e4a?w=600&h=800&fit=crop',
    ],
  },
];

async function seedProdutos() {
  console.log('Iniciando seed de produtos...\n');

  const [categoria] = await db
    .select({ id: categorias.id })
    .from(categorias)
    .where(eq(categorias.slug, 'novidades'))
    .limit(1);

  if (!categoria) {
    console.error(
      'Erro: A categoria "Novidades" não existe.'
    );
    console.error(
      'Execute primeiro: npm run db:seed:categorias'
    );

    process.exit(1);
  }

  for (const product of products) {
    const existingProduct = await db
      .select({ id: produtos.id })
      .from(produtos)
      .where(eq(produtos.slug, product.slug))
      .limit(1);

    if (existingProduct.length > 0) {
      console.log(`- Produto já existe: ${product.nome}`);
      continue;
    }

    const [produto] = await db
      .insert(produtos)
      .values({
        categoriaId: categoria.id,
        nome: product.nome,
        slug: product.slug,
        descricao: product.descricao,
        preco: product.preco,
        precoPromocional: product.precoPromocional,
        cor: product.cor,
        tamanho: product.tamanho,
        estoque: product.estoque,
        ativo: true,
      })
      .returning({
        id: produtos.id,
      });

    for (let i = 0; i < product.images.length; i++) {
      await db.insert(produtoImagens).values({
        produtoId: produto.id,
        url: product.images[i],
        ordem: i + 1,
      });
    }

    console.log(`✓ Produto criado: ${product.nome}`);
  }

  console.log('\nSeed de produtos concluído com sucesso!');

  process.exit(0);
}

seedProdutos().catch((error) => {
  console.error('Erro ao executar seed de produtos:', error);
  process.exit(1);
});