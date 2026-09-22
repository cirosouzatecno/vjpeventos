import { randomUUID } from 'node:crypto'
import { neon } from '@neondatabase/serverless'

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL não encontrada. Execute "vercel env pull .env.local" e carregue o ambiente antes de rodar este script.')
  process.exit(1)
}

const sql = neon(process.env.DATABASE_URL)

await sql`
  create table if not exists admin_users (
    id text primary key,
    email text not null unique,
    password_hash text not null,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
  )
`
await sql`
  create table if not exists admin_sessions (
    id text primary key,
    user_id text not null references admin_users(id) on delete cascade,
    token_hash text not null unique,
    expires_at timestamptz not null,
    created_at timestamptz not null default now()
  )
`
await sql`create index if not exists admin_sessions_token_idx on admin_sessions(token_hash)`
await sql`create index if not exists admin_sessions_expiry_idx on admin_sessions(expires_at)`
await sql`
  create table if not exists categories (
    id text primary key,
    name text not null,
    slug text not null unique,
    route_path text,
    sort_order integer not null default 0,
    is_active boolean not null default true,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
  )
`
await sql`
  create table if not exists media_items (
    id text primary key,
    category_id text references categories(id) on delete set null,
    title text not null,
    caption text,
    alt_text text,
    media_type text not null default 'image' check (media_type in ('image','video','youtube')),
    image_url text,
    youtube_id text,
    featured boolean not null default false,
    published boolean not null default true,
    sort_order integer not null default 0,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
  )
`
await sql`create index if not exists media_items_category_idx on media_items(category_id)`
await sql`create index if not exists media_items_featured_idx on media_items(featured)`
await sql`create index if not exists media_items_sort_idx on media_items(category_id, sort_order)`

const seeds = [
  ['Projetos', 'projetos', '/projetos', 10],
  ['Corporativo', 'corporativo', '/corporativo', 20],
  ['Festas', 'festas', '/festas', 30],
  ['Batizado', 'batizado', '/batizado', 40],
  ['15 Anos', '15-anos', '/15-anos', 50],
  ['Casamento', 'casamento', '/casamento', 60],
  ['Cerimônia', 'cerimonia', '/cerimonia', 70],
  ['Aniversário', 'aniversario', '/aniversario', 80],
  ['Decoração Residencial', 'decoracao-residencial', '/decoracao-residencial', 90],
  ['Especial Natal', 'especial-natal', '/especial-natal', 100],
]

for (const [name, slug, route, order] of seeds) {
  const existing = await sql`select id from categories where slug = ${slug} limit 1`
  if (existing[0]) {
    await sql`
      update categories
      set name = ${name}, route_path = ${route}, sort_order = ${order}, is_active = true, updated_at = now()
      where id = ${existing[0].id}
    `
  } else {
    await sql`
      insert into categories (id, name, slug, route_path, sort_order, is_active)
      values (${randomUUID()}, ${name}, ${slug}, ${route}, ${order}, true)
    `
  }
}

console.log('Banco configurado com sucesso.')
