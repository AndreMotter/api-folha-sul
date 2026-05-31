# Folha Sul API

Este projeto é uma API desenvolvida com [NestJS](https://nestjs.com/) e [Prisma ORM](https://www.prisma.io/), mapeando o banco de dados PostgreSQL para o aplicativo **Folha Sul**. A arquitetura foi inspirada diretamente no projeto **Scan Agro**.

## Requisitos Prévios

- Node.js (versão 20 ou superior recomendada)
- Instância do PostgreSQL rodando

## Configuração do Projeto

1. **Instalar dependências**:
   ```bash
   npm install
   ```

2. **Configurar as variáveis de ambiente**:
   O arquivo `.env` na raiz do projeto possui as seguintes variáveis:
   ```env
   DATABASE_URL="postgresql://usuario:senha@localhost:5432/api_folha_sul?schema=public"
   PORT=3003
   ```
   *Ajuste a string de conexão de acordo com suas credenciais do PostgreSQL.*

3. **Executar as migrações do banco de dados (Prisma Migration)**:
   Com o PostgreSQL rodando e a string de conexão configurada no `.env`, execute o comando abaixo para criar as tabelas no banco de dados:
   ```bash
   npx prisma migrate dev --name init_folha_sul
   ```

## Compilar e Executar o Projeto

```bash
# Modo de desenvolvimento (com auto-reload)
npm run start:dev

# Modo de produção (build)
npm run build
npm run start:prod
```

A API estará disponível em `http://localhost:3003` (ou na porta configurada no seu `.env`).

## Documentação da API (Swagger)

Com a API rodando, acesse a documentação interativa das rotas HTTP (Swagger UI) pelo link:
`http://localhost:3003/swagger`

## Estrutura de Endpoints (CRUDS)

- **Fsu Usuario**: `/fsu-usuario` (Login, ListarTodos, BuscarPorId, Salvar, Alterar, Excluir)
- **Fsu Propriedade**: `/fsu-propriedade` (ListarTodos, BuscarPorId, Salvar, Alterar, Excluir)
- **Fsu Talhao**: `/fsu-talhao` (ListarTodos, BuscarPorId, Salvar, Alterar, Excluir)
- **Fsu Safra**: `/fsu-safra` (ListarTodos, BuscarPorId, Salvar, Alterar, Excluir)
- **Fsu Analise Tecnica**: `/fsu-analise-tecnica` (ListarTodos, BuscarPorId, Salvar, Alterar, Excluir)
- **Fsu Analise Tecnica Imagem**: `/fsu-analise-tecnica-imagem` (ListarTodos, BuscarPorId, BuscarPorAnalise, Salvar, Alterar, Excluir)

As imagens são enviadas em formato **Base64** no campo `ati_imagem` do JSON, sendo automaticamente persistidas como **Bytes (bytea)** no banco PostgreSQL e retornadas como Base64 para facilitar o consumo do aplicativo mobile/web.
