import { pgTable, uuid, varchar, text, integer, decimal, boolean, timestamp, doublePrecision } from 'drizzle-orm/pg-core';

export const categorias = pgTable('categorias', {
  id: uuid('id').defaultRandom().primaryKey(),
  nome: varchar('nome', { length: 100 }).notNull(),
  slug: varchar('slug', { length: 120 }).notNull().unique(),
  descricao: text('descricao'),
  imagem: varchar('imagem', { length: 255 }),
  ordem: integer('ordem').notNull().default(0),
  ativo: boolean('ativo').notNull().default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const produtos = pgTable('produtos', {
  id: uuid('id').defaultRandom().primaryKey(),
  categoriaId: uuid('categoria_id').notNull().references(() => categorias.id),
  nome: varchar('nome', { length: 150 }).notNull(),
  slug: varchar('slug', { length: 150 }).notNull().unique(),
  descricao: text('descricao'),
  preco: doublePrecision('preco'),
  precoPromocional: doublePrecision('preco_promocional'),
  cor: varchar('cor', { length: 50 }),
  tamanho: varchar('tamanho', { length: 20 }),
  estoque: integer('estoque').notNull().default(0),
  ativo: boolean('ativo').notNull().default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const produtoImagens = pgTable('produto_imagens', {
  id: uuid('id').defaultRandom().primaryKey(),
  produtoId: uuid('produto_id').notNull().references(() => produtos.id),
  url: varchar('url', { length: 255 }).notNull(),
  publicId: varchar('public_id', { length: 255}),
  ordem: integer('ordem').notNull().default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const banners = pgTable('banners', {
  id: uuid('id').defaultRandom().primaryKey(),
  titulo: varchar('titulo', { length: 120 }),
  subtitulo: varchar('subtitulo', { length: 255 }),
  imagem: varchar('imagem', { length: 255 }).notNull(),
  publicId: varchar('public_id', { length: 255}),
  link: varchar('link', { length: 255 }),
  ordem: integer('ordem').notNull().default(0),
  ativo: boolean('ativo').notNull().default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const clientes = pgTable('clientes', {
  id: uuid('id').defaultRandom().primaryKey(),
  nome: varchar('nome', { length: 120 }).notNull(),
  telefone: varchar('telefone', { length: 20 }).notNull(),
  email: varchar('email', { length: 120 }),
  cidade: varchar('cidade', { length: 120 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const pedidos = pgTable('pedidos', {
  id: uuid('id').defaultRandom().primaryKey(),
  clienteId: uuid('cliente_id').notNull().references(() => clientes.id),
  origem: varchar('origem', { length: 20 }).notNull(),
  status: varchar('status', { length: 20 }).notNull().default('ABERTO'),
  observacaoCliente: text('observacao_cliente'),
  observacaoInterna: text('observacao_interna'),
  subtotal: doublePrecision('subtotal', ).notNull(),
  desconto: doublePrecision('desconto').notNull().default(0),
  total: doublePrecision('total').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const itensPedido = pgTable('itens_pedido', {
  id: uuid('id').defaultRandom().primaryKey(),
  pedidoId: uuid('pedido_id').notNull().references(() => pedidos.id),
  produtoId: uuid('produto_id').notNull().references(() => produtos.id),
  nomeProduto: varchar('nome_produto', { length: 150 }).notNull(),
  precoUnitario: doublePrecision('preco_unitario'),
  quantidade: integer('quantidade').notNull(),
  subtotal: doublePrecision('subtotal',).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const usuarios = pgTable('usuarios', {
  id: uuid('id').defaultRandom().primaryKey(),
  nome: varchar('nome', { length: 120 }).notNull(),
  email: varchar('email', { length: 120 }).notNull().unique(),
  senha: varchar('senha', { length: 255 }).notNull(),
  ativo: boolean('ativo').notNull().default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const configuracaoLoja = pgTable('configuracao_loja', {
  id: uuid('id').defaultRandom().primaryKey(),
  nomeLoja: varchar('nome_loja', { length: 120 }),
  logo: varchar('logo', { length: 255 }),
  telefoneWhatsapp: varchar('telefone_whatsapp', { length: 20 }),
  email: varchar('email', { length: 120 }),
  instagram: varchar('instagram', { length: 255 }),
  facebook: varchar('facebook', { length: 255 }),
corPrimaria: varchar('cor_primaria', { length: 20 }),
  corSecundaria: varchar('cor_secundaria', { length: 20 }),
  textoHome: text('texto_home'),
  mostrarPrecos: boolean('mostrar_precos').notNull().default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
