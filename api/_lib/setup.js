import { randomUUID } from 'node:crypto'
import { db } from './db.js'
import { hashPassword } from './auth.js'

let setupPromise = null

export function ensureDatabase() {
  if (!setupPromise) setupPromise = setup()
  return setupPromise
}

async function setup() {
  const sql = db()

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

  await sql`alter table media_items add column if not exists source_key text`
  await sql`create unique index if not exists media_items_source_key_idx on media_items(source_key) where source_key is not null`
  await sql`
    create table if not exists cms_migrations (
      key text primary key,
      applied_at timestamptz not null default now()
    )
  `

  const seeds = [
    ['Página Inicial', 'home', '/', 0],
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
    await sql`
      insert into categories (id, name, slug, route_path, sort_order, is_active)
      values (${randomUUID()}, ${name}, ${slug}, ${route}, ${order}, true)
      on conflict (slug) do nothing
    `
  }


  const legacyMigration = await sql`select key from cms_migrations where key = 'legacy-media-v1' limit 1`
  if (!legacyMigration[0]) {
    const categoryRows = await sql`select id, slug from categories`
    const categoryId = Object.fromEntries(categoryRows.map((row) => [row.slug, row.id]))

    const legacyMedia = [
      ['legacy:home:hero', 'home', 'Imagem principal da Home', 'image', 'https://horizons-cdn.hostinger.com/9ff0c242-ec08-4248-b694-3de2ee09bf42/img-20260605-wa0001-E2V4bcFE1sMqHZLZ.jpg?width=1440&fit=crop', null, 0],
      ['legacy:home:video:1', 'home', 'Vídeo da Home 1', 'youtube', null, 'dco9jz2aL7o', 10],
      ['legacy:home:video:2', 'home', 'Vídeo da Home 2', 'youtube', null, 'rLOTNCj1x1g', 20],
      ['legacy:home:video:3', 'home', 'Vídeo da Home 3', 'youtube', null, 'm7OETuDX684', 30],
      ['legacy:home:video:4', 'home', 'Vídeo da Home 4', 'youtube', null, 'jol6xQvyitk', 40],

      ['legacy:projetos:video:1', 'projetos', 'Vídeo de Projetos 1', 'youtube', null, 'b8X-PMvKYC0', 10],
      ['legacy:projetos:video:2', 'projetos', 'Vídeo de Projetos 2', 'youtube', null, 'iPRwcfobVs0', 20],
      ['legacy:projetos:video:3', 'projetos', 'Vídeo de Projetos 3', 'youtube', null, 'XQQoSAPjvS0', 30],

      ['legacy:corporativo:video:1', 'corporativo', 'Vídeo Corporativo 1', 'youtube', null, 'lLp8gHRiH-g', 10],
      ['legacy:corporativo:video:2', 'corporativo', 'Vídeo Corporativo 2', 'youtube', null, 'wnrmnXJ2Ky8', 20],
      ['legacy:corporativo:video:3', 'corporativo', 'Vídeo Corporativo 3', 'youtube', null, 'Ggcp1TDyJhw', 30],
      ['legacy:corporativo:video:4', 'corporativo', 'Vídeo Corporativo 4', 'youtube', null, 'nZxVG5JVpMQ', 40],
      ['legacy:corporativo:video:5', 'corporativo', 'Vídeo Corporativo 5', 'youtube', null, 'lLp8gHRiH-g', 50],
      ['legacy:corporativo:video:6', 'corporativo', 'Vídeo Corporativo 6', 'youtube', null, 'ZJfyptWijm8', 60],

      ['legacy:festas:video:1', 'festas', 'Vídeo de Festas 1', 'youtube', null, 'aLMI6EK5VWo', 10],
      ['legacy:batizado:video:1', 'batizado', 'Vídeo de Batizado 1', 'youtube', null, 'aLMI6EK5VWo', 10],

      ['legacy:15-anos:video:1', '15-anos', 'Vídeo de 15 Anos 1', 'youtube', null, 'b_U5UsKwP-4', 10],
      ['legacy:15-anos:video:2', '15-anos', 'Vídeo de 15 Anos 2', 'youtube', null, 'XW1wM9aRoAk', 20],
      ['legacy:15-anos:video:3', '15-anos', 'Vídeo de 15 Anos 3', 'youtube', null, 'pr45v1cjmJo', 30],
      ['legacy:15-anos:video:4', '15-anos', 'Vídeo de 15 Anos 4', 'youtube', null, 'w9qgYRzc7gA', 40],

      ['legacy:casamento:video:1', 'casamento', 'Vídeo de Casamento 1', 'youtube', null, 'GHdQmejdlc0', 10],
      ['legacy:casamento:video:2', 'casamento', 'Vídeo de Casamento 2', 'youtube', null, 'AwAIUZ8kw88', 20],

      ['legacy:cerimonia:video:1', 'cerimonia', 'Vídeo de Cerimônia 1', 'video', '/videos/cerimonia-1.mp4', null, 10],
      ['legacy:cerimonia:video:2', 'cerimonia', 'Vídeo de Cerimônia 2', 'video', '/videos/cerimonia-2.mp4', null, 20],

      ['legacy:aniversario:video:1', 'aniversario', 'Vídeo de Aniversário 1', 'youtube', null, 'AfGe1AzH7ZA', 10],

      ['legacy:decoracao-residencial:video:1', 'decoracao-residencial', 'Vídeo de Decoração Residencial 1', 'youtube', null, 'ajECYFgRKGI', 10],
      ['legacy:decoracao-residencial:video:2', 'decoracao-residencial', 'Vídeo de Decoração Residencial 2', 'youtube', null, 'WmZMLeSeleo', 20],
      ['legacy:decoracao-residencial:video:3', 'decoracao-residencial', 'Vídeo de Decoração Residencial 3', 'youtube', null, 'UhFUI6uWPKU', 30],

      ['legacy:especial-natal:image:11', 'especial-natal', 'Natal clássico em vermelho e dourado', 'image', 'https://raw.githubusercontent.com/cirosouzatecno/vjpeventos/master/src/assets/natal/11.jpg', null, 10],
      ['legacy:especial-natal:image:9', 'especial-natal', 'Elegância em rosa, dourado e luzes', 'image', 'https://raw.githubusercontent.com/cirosouzatecno/vjpeventos/master/src/assets/natal/9.jpg', null, 20],
      ['legacy:especial-natal:image:8', 'especial-natal', 'Uma celebração lúdica e afetiva', 'image', 'https://raw.githubusercontent.com/cirosouzatecno/vjpeventos/master/src/assets/natal/8.jpg', null, 30],
      ['legacy:especial-natal:image:7', 'especial-natal', 'Boas-vindas à mesa e à casa', 'image', 'https://raw.githubusercontent.com/cirosouzatecno/vjpeventos/master/src/assets/natal/7.jpg', null, 40],
      ['legacy:especial-natal:image:6', 'especial-natal', 'Composição artesanal cheia de personalidade', 'image', 'https://raw.githubusercontent.com/cirosouzatecno/vjpeventos/master/src/assets/natal/6.jpg', null, 50],
      ['legacy:especial-natal:image:5', 'especial-natal', 'Volume, brilho e presença', 'image', 'https://raw.githubusercontent.com/cirosouzatecno/vjpeventos/master/src/assets/natal/5.jpg', null, 60],
      ['legacy:especial-natal:image:4', 'especial-natal', 'Natal clássico em vermelho e dourado', 'image', 'https://raw.githubusercontent.com/cirosouzatecno/vjpeventos/master/src/assets/natal/4.jpg', null, 70],
      ['legacy:especial-natal:image:3', 'especial-natal', 'Elegância em rosa, dourado e luzes', 'image', 'https://raw.githubusercontent.com/cirosouzatecno/vjpeventos/master/src/assets/natal/3.jpg', null, 80],
      ['legacy:especial-natal:image:2', 'especial-natal', 'Encanto natalino em cada detalhe', 'image', 'https://raw.githubusercontent.com/cirosouzatecno/vjpeventos/master/src/assets/natal/2.jpg', null, 90],
      ['legacy:especial-natal:image:1', 'especial-natal', 'Uma paleta suave para celebrar', 'image', 'https://raw.githubusercontent.com/cirosouzatecno/vjpeventos/master/src/assets/natal/1.jpg', null, 100],
    ]

    for (const [sourceKey, slug, title, mediaType, imageUrl, youtubeId, sortOrder] of legacyMedia) {
      await sql`
        insert into media_items (
          id, category_id, title, caption, alt_text, media_type, image_url,
          youtube_id, featured, published, sort_order, source_key
        ) values (
          ${randomUUID()}, ${categoryId[slug] || null}, ${title},
          'Mídia já existente no site antes da ativação do CMS.', null, ${mediaType},
          ${imageUrl}, ${youtubeId}, false, false, ${sortOrder}, ${sourceKey}
        )
        on conflict do nothing
      `
    }

    await sql`
      insert into cms_migrations (key)
      values ('legacy-media-v1')
      on conflict (key) do nothing
    `
  }

  const email = String(process.env.ADMIN_EMAIL || '').trim().toLowerCase()
  const password = String(process.env.ADMIN_PASSWORD || '')
  if (email && password.length >= 10) {
    const count = await sql`select count(*)::int as total from admin_users`
    if ((count[0]?.total || 0) === 0) {
      const hash = await hashPassword(password)
      await sql`
        insert into admin_users (id, email, password_hash)
        values (${randomUUID()}, ${email}, ${hash})
        on conflict (email) do nothing
      `
    }
  }
}
