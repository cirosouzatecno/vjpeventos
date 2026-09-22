-- VJ Produções & Eventos - CMS em Postgres provisionado pela Vercel/Neon

create table if not exists admin_users (
  id text primary key,
  email text not null unique,
  password_hash text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists admin_sessions (
  id text primary key,
  user_id text not null references admin_users(id) on delete cascade,
  token_hash text not null unique,
  expires_at timestamptz not null,
  created_at timestamptz not null default now()
);

create index if not exists admin_sessions_token_idx on admin_sessions(token_hash);
create index if not exists admin_sessions_expiry_idx on admin_sessions(expires_at);

create table if not exists categories (
  id text primary key,
  name text not null,
  slug text not null unique,
  route_path text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

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
);

create index if not exists media_items_category_idx on media_items(category_id);
create index if not exists media_items_featured_idx on media_items(featured);
create index if not exists media_items_sort_idx on media_items(category_id, sort_order);
