-- VJ Produções & Eventos - CMS administrativo
-- Execute este arquivo no SQL Editor do Supabase vinculado ao projeto.

create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null,
  route_path text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.categories add column if not exists route_path text;
alter table public.categories add column if not exists sort_order integer not null default 0;
alter table public.categories add column if not exists is_active boolean not null default true;
alter table public.categories add column if not exists created_at timestamptz not null default now();
alter table public.categories add column if not exists updated_at timestamptz not null default now();

create unique index if not exists categories_slug_unique on public.categories(slug);

create table if not exists public.media_items (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references public.categories(id) on delete set null,
  title text not null,
  caption text,
  alt_text text,
  media_type text not null default 'image',
  image_url text,
  storage_path text,
  youtube_id text,
  featured boolean not null default false,
  published boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.media_items add column if not exists caption text;
alter table public.media_items add column if not exists alt_text text;
alter table public.media_items add column if not exists media_type text not null default 'image';
alter table public.media_items add column if not exists storage_path text;
alter table public.media_items add column if not exists published boolean not null default true;
alter table public.media_items add column if not exists sort_order integer not null default 0;
alter table public.media_items add column if not exists created_at timestamptz not null default now();
alter table public.media_items add column if not exists updated_at timestamptz not null default now();

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'media_items_media_type_check'
      and conrelid = 'public.media_items'::regclass
  ) then
    alter table public.media_items
      add constraint media_items_media_type_check
      check (media_type in ('image','video','youtube'));
  end if;
end $$;

create index if not exists media_items_category_idx on public.media_items(category_id);
create index if not exists media_items_featured_idx on public.media_items(featured);
create index if not exists media_items_sort_idx on public.media_items(category_id, sort_order);

create or replace function public.is_site_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_users
    where user_id = auth.uid()
  );
$$;

grant execute on function public.is_site_admin() to authenticated;

alter table public.admin_users enable row level security;
alter table public.categories enable row level security;
alter table public.media_items enable row level security;

drop policy if exists "admin can read own grant" on public.admin_users;
create policy "admin can read own grant"
on public.admin_users for select
to authenticated
using (user_id = auth.uid());

drop policy if exists "public can read active categories" on public.categories;
create policy "public can read active categories"
on public.categories for select
to anon, authenticated
using (is_active = true or public.is_site_admin());

drop policy if exists "admins manage categories" on public.categories;
create policy "admins manage categories"
on public.categories for all
to authenticated
using (public.is_site_admin())
with check (public.is_site_admin());

drop policy if exists "public can read published media" on public.media_items;
create policy "public can read published media"
on public.media_items for select
to anon, authenticated
using (published = true or public.is_site_admin());

drop policy if exists "admins manage media" on public.media_items;
create policy "admins manage media"
on public.media_items for all
to authenticated
using (public.is_site_admin())
with check (public.is_site_admin());

insert into storage.buckets (id, name, public, file_size_limit)
values ('site-media', 'site-media', true, 52428800)
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit;

drop policy if exists "public reads site media" on storage.objects;
create policy "public reads site media"
on storage.objects for select
to public
using (bucket_id = 'site-media');

drop policy if exists "admins upload site media" on storage.objects;
create policy "admins upload site media"
on storage.objects for insert
to authenticated
with check (bucket_id = 'site-media' and public.is_site_admin());

drop policy if exists "admins update site media" on storage.objects;
create policy "admins update site media"
on storage.objects for update
to authenticated
using (bucket_id = 'site-media' and public.is_site_admin())
with check (bucket_id = 'site-media' and public.is_site_admin());

drop policy if exists "admins delete site media" on storage.objects;
create policy "admins delete site media"
on storage.objects for delete
to authenticated
using (bucket_id = 'site-media' and public.is_site_admin());

insert into public.categories (name, slug, route_path, sort_order, is_active)
values
  ('Projetos', 'projetos', '/projetos', 10, true),
  ('Corporativo', 'corporativo', '/corporativo', 20, true),
  ('Festas', 'festas', '/festas', 30, true),
  ('Batizado', 'batizado', '/batizado', 40, true),
  ('15 Anos', '15-anos', '/15-anos', 50, true),
  ('Casamento', 'casamento', '/casamento', 60, true),
  ('Cerimônia', 'cerimonia', '/cerimonia', 70, true),
  ('Aniversário', 'aniversario', '/aniversario', 80, true),
  ('Decoração Residencial', 'decoracao-residencial', '/decoracao-residencial', 90, true),
  ('Especial Natal', 'especial-natal', '/especial-natal', 100, true)
on conflict (slug) do update
set name = excluded.name,
    route_path = excluded.route_path,
    sort_order = excluded.sort_order,
    is_active = true,
    updated_at = now();

-- Depois de criar um usuário em Authentication > Users, transforme-o em administrador:
-- insert into public.admin_users (user_id)
-- select id from auth.users where email = 'SEU_EMAIL@EXEMPLO.COM'
-- on conflict (user_id) do nothing;
