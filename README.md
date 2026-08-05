# Catálogo Online

O **Catálogo Online** foi desenvolvido inicialmente sob medida para uma cliente que precisava de uma forma mais prática de apresentar seus produtos e receber pedidos pelo WhatsApp.

A ideia surgiu de uma necessidade simples: ela já realizava suas vendas pelo WhatsApp, mas precisava enviar fotos e informações dos produtos individualmente para cada cliente. Além disso, quando saía para vender, precisava levar diversas peças de roupa, o que acabava tornando o processo mais demorado.

Com o catálogo, ela passou a ter um único link para compartilhar com seus clientes, onde eles podem consultar os produtos disponíveis e enviar o pedido diretamente pelo WhatsApp. A plataforma também funciona como uma vitrine digital que pode ser compartilhada como portfólio da loja.

O projeto começou como uma solução para uma necessidade específica, mas sua estrutura foi desenvolvida pensando em servir como uma base que possa ser adaptada para outros negócios.

## 📸 Preview
<p align="center">
  <img src="https://res.cloudinary.com/dhgqabtuy/image/upload/v1785530671/Screenshot_2026-07-31-17-31-40-523_com.android.chrome_untetc.png" width="18%" />
  <img src="https://res.cloudinary.com/dhgqabtuy/image/upload/v1785530672/Screenshot_2026-07-31-17-32-51-539_com.android.chrome_ylbocm.png" width="18%" />
  <img src="https://res.cloudinary.com/dhgqabtuy/image/upload/v1785530671/Screenshot_2026-07-31-17-32-30-786_com.android.chrome_nntvxi.png" width="18%" />
  <img src="https://res.cloudinary.com/dhgqabtuy/image/upload/v1785530671/Screenshot_2026-07-31-17-32-06-055_com.android.chrome_fokjzr.png" width="18%" />
  <img src="https://res.cloudinary.com/dhgqabtuy/image/upload/v1785530671/Screenshot_2026-07-31-17-31-40-523_com.android.chrome_untetc.png" width="18%" />
</p>

<a href="https://catalogo-online-base.vercel.app/" target="_blank">[Demo]</a>

## ✨ Funcionalidades

### Catálogo

* Visualização de produtos e categorias
* Busca e navegação por categorias
* Página de detalhes dos produtos
* Banners e destaques
* Compartilhamento do catálogo através de um link

### Produtos

* Cadastro e gerenciamento de produtos
* Múltiplas imagens por produto
* Preço e preço promocional
* Controle de disponibilidade

### Pedidos

* Carrinho de compras
* Definição de quantidades
* Resumo do pedido
* Envio do pedido diretamente pelo WhatsApp

### Painel administrativo

* Autenticação de usuários
* Dashboard
* Gerenciamento de produtos
* Gerenciamento de categorias
* Gerenciamento de banners
* Gerenciamento de pedidos

## 🛠️ Tecnologias

### Frontend
* **Nuxt 4**
* **Vue 3**
* **TypeScript**
* **Nuxt UI**
* **Tailwind CSS**
* **Pinia**
* **Zod**

### Backend
* **Node.js**
* **Express**
* **TypeScript**
* **Drizzle ORM**
* **Zod**
* **JWT**
* **bcrypt**

### Banco de dados
* **PostgreSQL**

 ## 🏗️ Arquitetura

O projeto foi estruturado como uma aplicação **fullstack separada em frontend e backend**, com responsabilidades bem definidas entre as diferentes partes do sistema.

```text
┌──────────────────────┐
│      Frontend        │
│    Nuxt + Vue 3      │
└──────────┬───────────┘
           │ HTTP
           ▼
┌──────────────────────┐
│       Backend        │
│  Node.js + Express   │
└──────────┬───────────┘
           │
     ┌─────┴─────┐
     ▼           ▼
 PostgreSQL   Cloudinary
```

No backend, a aplicação utiliza uma separação entre **Controllers, Services e Repositories**, além de validação de dados, middlewares e injeção de dependências.

De forma geral, o fluxo de uma requisição segue:

```text
Route
  ↓
Controller
  ↓
Service
  ↓
Repository
  ↓
Database
```

Essa estrutura busca manter as responsabilidades separadas e reduzir o acoplamento entre as diferentes partes da aplicação.

> A arquitetura foi sendo construída e refinada durante o desenvolvimento. Algumas abstrações foram utilizadas para explorar padrões como Repository Pattern e Dependency Injection, mas o projeto também serviu para perceber que abstrações possuem um custo e devem ser introduzidas conforme a complexidade real do sistema.

## 📁 Estrutura do projeto

O projeto é organizado em duas aplicações independentes, **frontend** e **backend**, além dos arquivos relacionados à infraestrutura.

```text
catalogo-online-base/
├── backend/
├── frontend/
├── docker-compose.yml
├── package.json
└── package-lock.json
```

### Backend

```text
backend/
└── src/
    ├── @types/
    ├── config/
    ├── controllers/
    ├── database/
    ├── dtos/
    ├── factories/
    ├── middlewares/
    ├── repositories/
    ├── routes/
    ├── schemas/
    ├── services/
    ├── shared/
    └── server.ts
```

Principais responsabilidades:

* `controllers/` — recebe as requisições HTTP e retorna as respostas.
* `services/` — concentra a lógica de aplicação e regras de negócio.
* `repositories/` — abstrai o acesso aos dados.
* `routes/` — define as rotas da API.
* `schemas/` — valida os dados de entrada.
* `dtos/` — define estruturas utilizadas na comunicação entre as camadas.
* `middlewares/` — autenticação, tratamento e processamento intermediário das requisições.
* `factories/` — construção e injeção das dependências.
* `database/` — configuração e definição relacionada ao banco de dados.

### Frontend

```text
frontend/
└── app/
    ├── assets/
    ├── components/
    ├── composables/
    ├── constants/
    ├── layouts/
    ├── middleware/
    ├── pages/
    ├── plugins/
    ├── schemas/
    ├── services/
    ├── stores/
    ├── types/
    └── utils/
```

Principais responsabilidades:

* `pages/` — páginas e rotas da aplicação.
* `components/` — componentes reutilizáveis da interface.
* `composables/` — lógica reutilizável do Vue/Nuxt.
* `services/` — comunicação com a API.
* `stores/` — gerenciamento de estado global.
* `schemas/` — validação de dados.
* `middleware/` — controle de acesso e navegação.
* `types/` — tipagens utilizadas pela aplicação.
* `utils/` — funções utilitárias.

## 🗄️ Banco de dados

O projeto utiliza **PostgreSQL** como banco de dados relacional, com **Drizzle ORM** para definição do schema, consultas e migrations.

A modelagem foi construída para atender às principais necessidades do catálogo e do processo de vendas.

### Principais entidades

* **Users** — usuários responsáveis pelo acesso ao painel administrativo.
* **Categories** — categorias utilizadas para organizar os produtos.
* **Products** — informações dos produtos disponíveis no catálogo.
* **Product Images** — imagens associadas aos produtos.
* **Product Variants** — variações dos produtos, como tamanho e cor.
* **Banners** — banners exibidos no catálogo.
* **Customers** — clientes que realizam pedidos.
* **Orders** — pedidos realizados através do catálogo.
* **Order Items** — produtos e quantidades associados a cada pedido.

A utilização de um banco relacional permite manter os relacionamentos e as regras de integridade dos dados diretamente no banco.

## 🔄 Principais fluxos

### Cadastro de produtos

O administrador acessa o painel e cadastra um novo produto, adicionando suas informações, categoria, preço, variações e imagens.

```text
Administrador
     ↓
Painel administrativo
     ↓
API
     ↓
Validação
     ↓
Service
     ↓
Repository
     ↓
PostgreSQL
     ↓
Cloudinary
```

As imagens são armazenadas no **Cloudinary**, enquanto suas URLs são vinculadas aos produtos no banco de dados.

### Pedido pelo catálogo

O cliente acessa o catálogo através de um link, escolhe os produtos e adiciona os itens ao carrinho.

```text
Cliente
   ↓
Catálogo
   ↓
Produtos
   ↓
Carrinho
   ↓
Resumo do pedido
   ↓
WhatsApp
```

O pedido é montado a partir dos produtos selecionados e enviado para o WhatsApp, onde a negociação e a finalização da venda continuam.

## 🐳 Desenvolvimento local

### Pré-requisitos

* Node.js
* npm
* Docker e Docker Compose
* Git

### 1. Clone o repositório

```bash
git clone https://github.com/GuilhermeSchwengber20/catalogo-online-base.git
cd catalogo-online-base
```

### 2. Configure as variáveis de ambiente

Crie os arquivos `.env` necessários no frontend e backend a partir dos exemplos disponíveis no projeto.

### 3. Inicie o banco de dados

```bash
docker compose up -d
```

### 4. Instale as dependências

```bash
cd backend
npm install

cd ../frontend
npm install
```

### 5. Execute o backend

```bash
cd backend
npm run dev
```

### 6. Execute o frontend

Em outro terminal:

```bash
cd frontend
npm run dev
```

Após iniciar as aplicações, o frontend e a API estarão disponíveis nos endereços configurados no ambiente local.

## 🚀 Deploy

A aplicação está hospedada utilizando serviços separados para cada parte da infraestrutura:

* **Frontend:** Vercel
* **Backend:** Render
* **Banco de dados:** PostgreSQL
* **Armazenamento de imagens:** Cloudinary

O frontend se comunica com a API através de HTTP, enquanto o backend é responsável pelo acesso ao banco de dados e pelos serviços de armazenamento.

Essa separação permite que frontend e backend sejam desenvolvidos, implantados e escalados de forma independente.

## 📚 Aprendizados

Além de colocar em prática conhecimentos de desenvolvimento fullstack, este projeto trouxe alguns aprendizados importantes sobre arquitetura e desenvolvimento de software.

Um dos principais foi perceber que **uma arquitetura mais complexa não significa necessariamente uma arquitetura melhor**. Durante o desenvolvimento, algumas abstrações e padrões foram aplicados antes de existir uma necessidade real, aumentando a quantidade de arquivos e a complexidade para realizar mudanças simples.

Isso me fez repensar a forma como enxergo **Clean Architecture, SOLID, Repository Pattern e Dependency Injection**. Esses conceitos são ferramentas importantes, mas não devem ser tratados como uma receita que precisa ser aplicada integralmente em todo projeto.

Hoje, vejo arquitetura de forma mais evolutiva: começar com uma solução simples, entender os problemas que surgem durante o desenvolvimento e introduzir novas abstrações quando elas realmente ajudam a resolver esses problemas.

O projeto também foi uma oportunidade para colocar em prática conhecimentos de **TypeScript, Node.js, Vue, Nuxt, PostgreSQL, Docker, autenticação, upload de imagens, APIs REST e deploy em produção**.

## 🔮 Próximos passos

Como o projeto foi desenvolvido pensando em servir como uma **base reutilizável para diferentes negócios**, os próximos passos estão voltados para tornar sua configuração e implantação cada vez mais simples e replicável.

* Ampliar as opções de configuração e personalização por cliente
* Tornar identidade visual, informações da loja e outras configurações mais flexíveis
* Melhorar o processo de preparação e configuração de novos ambientes
* Estudar e aprimorar o processo de deploy
* Avaliar melhorias na infraestrutura conforme novos clientes utilizarem a plataforma
* Continuar evoluindo a aplicação a partir das necessidades reais dos clientes

## 👨‍💻 Autor

**Guilherme Schwengber**

Desenvolvedor Fullstack com foco em **Node.js, TypeScript, Vue e Nuxt**.

* GitHub: [GuilhermeSchwengber20](https://github.com/GuilhermeSchwengber20)
* LinkedIn: [Guilherme Schwengber](https://www.linkedin.com/in/guilherme-schwengber)

