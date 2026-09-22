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

O projeto atual usa o modelo moderno da Vercel com **OIDC**, então não depende de `BLOB_READ_WRITE_TOKEN`. A integração fornece `BLOB_STORE_ID` e as Vercel Functions recebem credenciais OIDC de curta duração automaticamente.

O store pode permanecer **privado**. O CMS grava as mídias com `access: 'private'` e gera URLs assinadas de leitura para exibição no site.

Depois de conectar os recursos, faça um novo deploy para que as novas variáveis sejam incorporadas às Vercel Functions.

## 3. Inicialização automática

Não é obrigatório executar SQL manualmente.

Depois de conectar o Neon, adicione temporariamente nas variáveis do projeto:

```
ADMIN_EMAIL
ADMIN_PASSWORD
```

Use uma senha com pelo menos 10 caracteres. Faça um novo deploy.

Na primeira chamada à API, o próprio sistema cria automaticamente:

- `admin_users`
- `admin_sessions`
- `categories`
- `media_items`
- índices
- categorias iniciais do site
- o primeiro administrador, caso ainda não exista nenhum

A senha nunca é salva em texto aberto. O sistema grava um hash usando `scrypt`.

Depois de conseguir entrar no painel, `ADMIN_EMAIL` e `ADMIN_PASSWORD` podem ser removidos da Vercel e um novo deploy pode ser feito.

Como alternativa para manutenção técnica, continuam disponíveis `npm run db:setup`, `npm run admin:create` e o SQL de referência em `db/schema.sql`.

## 4. Acesso ao painel

Depois do deploy:

```
https://vjproducoeseventos.com.br/admin
```

ou

```
https://vjpeventos.vercel.app/admin
```

## 5. O que o painel administra

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

## 6. Páginas conectadas

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

## 7. Segurança

O navegador nunca recebe `DATABASE_URL` nem credenciais permanentes do Blob.

Operações administrativas passam pelas Vercel Functions e exigem cookie de sessão `HttpOnly` com `SameSite=Strict`. As sessões são armazenadas no Postgres com somente o hash do token.

O Blob usa OIDC de curta duração. As mídias ficam privadas no storage e o endpoint público `/api/content` entrega somente itens publicados com URLs assinadas temporárias para leitura.
