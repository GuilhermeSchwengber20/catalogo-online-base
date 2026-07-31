import { db } from './connection';
import { usuarios, configuracaoLoja } from './schema';
import bcrypt from 'bcryptjs';

async function seed() {
  const senha = await bcrypt.hash('admin123', 10);

  await db.insert(usuarios).values({
    nome: 'Administrador',
    email: 'admin@donadecor.com.br',
    senha,
    ativo: true,
  });

  await db.insert(configuracaoLoja).values({
    nomeLoja: 'Dona Decor Imports',
    telefoneWhatsapp: '5511999999999',
    email: 'contato@donadecor.com.br',
    mostrarPrecos: true,
  });

  console.log('Seed concluído com sucesso!');
  process.exit(0);
}

seed();
