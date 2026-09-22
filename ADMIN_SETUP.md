# Administração do site VJ Produções & Eventos

O projeto possui um CMS em `/admin` integrado ao Supabase.

## O que o painel administra

- login por e-mail e senha;
- Dashboard com contadores;
- criação, edição e exclusão de categorias;
- menu lateral com uma galeria para cada categoria;
- upload de fotos e vídeos para o bucket `site-media`;
- inclusão de vídeos do YouTube ou mídia por URL;
- edição de título, legenda e texto alternativo;
- publicação/despublicação;
- destaque de itens na página inicial;
- ordenação de mídias;
- movimentação de uma mídia entre categorias;
- exclusão do arquivo do Storage quando a mídia é removida;
- exibição automática da galeria correspondente nas páginas públicas.

## 1. Banco e Storage

Abra o SQL Editor do Supabase vinculado ao site e execute:

`supabase/admin-cms.sql`

O script é idempotente e:
- cria/atualiza `categories`, `media_items` e `admin_users`;
- cria o bucket público `site-media`;
- ativa RLS;
- cria políticas de leitura pública e escrita apenas por administradores;
- cadastra as categorias do menu atual do site.

## 2. Variáveis na Vercel

O projeto usa:

```
VITE_SUPABASE_URL
VITE_SUPABASE_PUBLISHABLE_KEY
```

Também aceita `VITE_SUPABASE_ANON_KEY` como alternativa à chave publicável.

Configure as variáveis em Production e Preview e faça um novo deploy quando houver alteração.

## 3. Criar o primeiro login

No Supabase, abra Authentication > Users e crie o usuário com e-mail e senha.

Depois, no SQL Editor, autorize esse usuário como administrador:

```sql
insert into public.admin_users (user_id)
select id
from auth.users
where email = 'SEU_EMAIL@EXEMPLO.COM'
on conflict (user_id) do nothing;
```

Apenas usuários presentes em `admin_users` conseguem alterar categorias, mídias ou arquivos.

## 4. Acesso

Depois do deploy:

- `https://vjproducoeseventos.com.br/admin`
- ou `https://vjpeventos.vercel.app/admin`

## 5. Relação entre categoria e página

As galerias dinâmicas usam estes slugs:

| Página | Slug |
|---|---|
| Projetos | projetos |
| Corporativo | corporativo |
| Festas | festas |
| Batizado | batizado |
| 15 Anos | 15-anos |
| Casamento | casamento |
| Cerimônia | cerimonia |
| Aniversário | aniversario |
| Decoração Residencial | decoracao-residencial |
| Especial Natal | especial-natal |

Itens marcados como **Destaque na página inicial** aparecem na galeria dinâmica de destaques da Home.

## Segurança

O front-end usa apenas a chave pública do Supabase. Permissões reais são aplicadas por RLS no banco e no Storage. Não coloque `service_role` ou qualquer segredo administrativo em variáveis `VITE_*`.
