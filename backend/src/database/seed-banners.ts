import { db } from './connection';
import { banners } from './schema';

const CATEGORIA_SLUG = process.env.CATEGORIA_SLUG || 'vestidos';

const bannerData = [
  {
    titulo: 'Grupo de Ofertas',
    subtitulo: 'Entre no nosso grupo do WhatsApp e fique por dentro das promoções',
    imagem: 'https://images.unsplash.com/photo-1611606063065-ee7946f0787a?w=1200&h=600&fit=crop',
    link: 'https://chat.whatsapp.com/ExemploDoGrupo',
    ordem: 1,
  },
  {
    titulo: 'Coleção Verão',
    subtitulo: 'Confira as novidades da estação',
    imagem: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=1200&h=600&fit=crop',
    link: `/category/${CATEGORIA_SLUG}`,
    ordem: 2,
  },
];

async function seedBanners() {
  for (const data of bannerData) {
    await db.insert(banners).values(data);
    console.log(`✓ Banner criado: ${data.titulo}`);
  }

  console.log('\nSeed de banners concluído com sucesso!');
  process.exit(0);
}

seedBanners();
