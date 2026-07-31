import { eq } from 'drizzle-orm';
import { db } from './connection';
import { categorias } from '@/database/schema';

const categories = [
  {
    nome: 'Novidades',
    slug: 'novidades',
    descricao: 'Confira as novidades que acabaram de chegar.',
    imagem: null,
    ordem: 1,
  },
  {
    nome: 'Feminino',
    slug: 'feminino',
    descricao: 'Roupas femininas para todos os momentos.',
    imagem: null,
    ordem: 2,
  },
  {
    nome: 'Masculino',
    slug: 'masculino',
    descricao: 'Roupas masculinas com estilo e conforto.',
    imagem: null,
    ordem: 3,
  },
  {
    nome: 'Plus Size',
    slug: 'plus-size',
    descricao: 'Moda plus size com conforto e estilo.',
    imagem: null,
    ordem: 4,
  },
  {
    nome: 'Fitness',
    slug: 'fitness',
    descricao: 'Roupas para academia e atividades físicas.',
    imagem: null,
    ordem: 5,
  },
  {
    nome: 'Promoções',
    slug: 'promocoes',
    descricao: 'Produtos com preços especiais e ofertas.',
    imagem: null,
    ordem: 6,
  },
];

async function seedCategorias() {
  console.log('Iniciando seed de categorias...\n');

  for (const category of categories) {
    const [existingCategory] = await db
      .select({ id: categorias.id })
      .from(categorias)
      .where(eq(categorias.slug, category.slug))
      .limit(1);

    if (existingCategory) {
      console.log(`- Categoria já existe: ${category.nome}`);
      continue;
    }

    await db.insert(categorias).values({
      nome: category.nome,
      slug: category.slug,
      descricao: category.descricao,
      imagem: category.imagem,
      ordem: category.ordem,
      ativo: true,
    });

    console.log(`✓ Categoria criada: ${category.nome}`);
  }

  console.log('\nSeed de categorias concluído com sucesso!');
}

seedCategorias().catch((error) => {
  console.error('Erro ao executar seed de categorias:', error);
  process.exit(1);
});