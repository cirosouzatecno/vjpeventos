# CMS VJ Produções & Eventos — Vercel Data Stack

O painel `/admin` foi migrado para uma arquitetura baseada na infraestrutura da Vercel:

- **Vercel Functions**: API privada e pública do CMS;
- **Neon Postgres via Vercel Marketplace**: categorias, mídias, usuários e sessões;
- **Vercel Blob**: armazenamento de fotos e vídeos;
- **Cookie HttpOnly**: sessão administrativa, sem credenciais de banco no navegador.

O Supabase não é mais utilizado.

## 1. Conectar o banco Postgres ao projeto

No projeto `vjpeventos` da Vercel, abra **Storage / Marketplace** e adicione **Neon Postgres** ao projeto.

A integração deve criar automaticamente uma variável:

```
DATABASE_URL
```

Habilite a integração para **Production** e **Preview**.

> O antigo produto `@vercel/postgres` foi descontinuado. Atualmente a Vercel oferece Postgres por integrações do Marketplace, sendo Neon a opção serverless indicada para esse tipo de aplicação.

## 2. Criar o armazenamento de fotos e vídeos

Ainda no projeto `vjpeventos`, crie/conecte um **Vercel Blob**.

A Vercel deve disponibilizar:

```
BLOB_READ_WRITE_TOKEN
```

O token fica somente no servidor. Ele não é exposto como variável `VITE_*`.

## 3. Preparar o banco

Com o projeto ligado à Vercel, no diretório do repositório:

```bash
npm install
vercel env pull .env.local --yes
npm run db:setup
```

O comando cria:

- `admin_users`
- `admin_sessions`
- `categories`
- `media_items`
- índices
- categorias iniciais do site

O SQL de referência também está em `db/schema.sql`.

## 4. Criar o primeiro administrador

Defina o e-mail e uma senha com pelo menos 10 caracteres apenas durante a execução:

```bash
ADMIN_EMAIL="email@exemplo.com" ADMIN_PASSWORD="SENHA_FORTE" npm run admin:create
```

A senha nunca é salva em texto aberto. O sistema grava um hash usando `scrypt`.

Depois do comando, não é necessário manter `ADMIN_EMAIL` ou `ADMIN_PASSWORD` na Vercel.

## 5. Acesso ao painel

Depois do deploy:

```
https://vjproducoeseventos.com.br/admin
```

ou

```
https://vjpeventos.vercel.app/admin
```

## 6. O que o painel administra

- login e logout;
- Dashboard com totais;
- criação, edição e remoção de categorias;
- galeria individual por categoria;
- upload direto para Vercel Blob;
- fotos, vídeos e vídeos do YouTube;
- título, legenda e texto alternativo;
- publicação/despublicação;
- destaque na Home;
- mudança de mídia entre categorias;
- ordenação;
- exclusão da mídia e do Blob correspondente.

## 7. Páginas conectadas

| Página | Slug |
|---|---|
| Projetos | `projetos` |
| Corporativo | `corporativo` |
| Festas | `festas` |
| Batizado | `batizado` |
| 15 Anos | `15-anos` |
| Casamento | `casamento` |
| Cerimônia | `cerimonia` |
| Aniversário | `aniversario` |
| Decoração Residencial | `decoracao-residencial` |
| Especial Natal | `especial-natal` |

## 8. Segurança

O navegador nunca recebe `DATABASE_URL` nem `BLOB_READ_WRITE_TOKEN`.

Operações administrativas passam pelas Vercel Functions e exigem cookie de sessão `HttpOnly` com `SameSite=Strict`. As sessões são armazenadas no Postgres com somente o hash do token.

O endpoint público `/api/content` entrega somente mídias marcadas como publicadas.
