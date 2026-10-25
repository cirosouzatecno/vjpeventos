import { legacyFestasMedia } from '../../api/_lib/legacy-festas-media.js'

export interface CategoryItem {
  id: string
  name: string
  slug: string
  route_path?: string | null
  sort_order: number
  is_active: boolean
}

export interface MediaItem {
  id: string
  category_id?: string | null
  title: string
  caption?: string | null
  alt_text?: string | null
  media_type: 'image' | 'video' | 'youtube'
  image_url?: string | null
  youtube_id?: string | null
  featured: boolean
  published: boolean
  sort_order: number
  source_key?: string | null
  display_url?: string | null
}

const DEFAULT_CATEGORIES: CategoryItem[] = [
  { id: 'cat-home', name: 'Página Inicial', slug: 'home', route_path: '/', sort_order: 0, is_active: true },
  { id: 'cat-projetos', name: 'Projetos', slug: 'projetos', route_path: '/projetos', sort_order: 10, is_active: true },
  { id: 'cat-corporativo', name: 'Corporativo', slug: 'corporativo', route_path: '/corporativo', sort_order: 20, is_active: true },
  { id: 'cat-festas', name: 'Festas e celebrações', slug: 'festas', route_path: '/festas', sort_order: 30, is_active: true },
  { id: 'cat-batizado', name: 'Batizados', slug: 'batizado', route_path: '/batizado', sort_order: 40, is_active: true },
  { id: 'cat-15-anos', name: '15 anos', slug: '15-anos', route_path: '/15-anos', sort_order: 50, is_active: true },
  { id: 'cat-casamento', name: 'Casamentos', slug: 'casamento', route_path: '/casamento', sort_order: 60, is_active: true },
  { id: 'cat-cerimonia', name: 'Cerimônias', slug: 'cerimonia', route_path: '/cerimonia', sort_order: 70, is_active: true },
  { id: 'cat-aniversario', name: 'Aniversários', slug: 'aniversario', route_path: '/aniversario', sort_order: 80, is_active: true },
  { id: 'cat-decoracao-residencial', name: 'Decoração residencial', slug: 'decoracao-residencial', route_path: '/decoracao-residencial', sort_order: 90, is_active: true },
  { id: 'cat-especial-natal', name: 'Especial de Natal', slug: 'especial-natal', route_path: '/especial-natal', sort_order: 100, is_active: true },
]

function getInitialMedia(): MediaItem[] {
  const festasCat = 'cat-festas'
  const festasItems: MediaItem[] = (legacyFestasMedia as any[]).map((m, idx) => ({
    id: `festas-${idx + 1}`,
    category_id: festasCat,
    title: m.title,
    caption: m.caption,
    alt_text: m.alt,
    media_type: m.media_type,
    image_url: m.image_url,
    youtube_id: m.youtube_id,
    featured: idx < 4,
    published: true,
    sort_order: m.sort_order,
    source_key: m.sourceKey,
    display_url: m.image_url,
  }))

  const extraItems: MediaItem[] = [
    {
      id: 'casamento-video-1',
      category_id: 'cat-casamento',
      title: 'Decoração de Casamento',
      caption: 'Flores, luz e composições que traduzem a personalidade do casal.',
      alt_text: 'Vídeo de casamento V J Produções',
      media_type: 'youtube',
      youtube_id: 'GHdQmejdlc0',
      featured: true,
      published: true,
      sort_order: 10,
    },
    {
      id: 'casamento-video-2',
      category_id: 'cat-casamento',
      title: 'Casamento dos Sonhos',
      caption: 'Ambientação com passarela de flores e luzes especiais.',
      alt_text: 'Vídeo casamento',
      media_type: 'youtube',
      youtube_id: 'AwAIUZ8kw88',
      featured: false,
      published: true,
      sort_order: 20,
    },
    {
      id: 'cerimonia-vid-1',
      category_id: 'cat-cerimonia',
      title: 'Cerimônia Especial 1',
      caption: 'Passarela verde com flores brancas e castiçais de vidro',
      alt_text: 'Cerimônia VJ',
      media_type: 'video',
      image_url: '/videos/cerimonia-1.mp4',
      featured: true,
      published: true,
      sort_order: 10,
    },
    {
      id: 'cerimonia-vid-2',
      category_id: 'cat-cerimonia',
      title: 'Cerimônia Especial 2',
      caption: 'Composição de flores e ambientação clássica',
      alt_text: 'Cerimônia VJ',
      media_type: 'video',
      image_url: '/videos/cerimonia-2.mp4',
      featured: false,
      published: true,
      sort_order: 20,
    },
  ]

  return [...extraItems, ...festasItems]
}

const STORAGE_KEY_CATEGORIES = 'vj_cms_categories'
const STORAGE_KEY_MEDIA = 'vj_cms_media'
const STORAGE_KEY_SESSION = 'vj_cms_session'

export function getLocalCategories(): CategoryItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CATEGORIES)
    if (raw) return JSON.parse(raw)
  } catch {}
  return DEFAULT_CATEGORIES
}

export function saveLocalCategories(cats: CategoryItem[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_CATEGORIES, JSON.stringify(cats))
  } catch {}
}

export function getLocalMedia(): MediaItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_MEDIA)
    if (raw) return JSON.parse(raw)
  } catch {}
  return getInitialMedia()
}

export function saveLocalMedia(items: MediaItem[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_MEDIA, JSON.stringify(items))
  } catch {}
}

export function getLocalSession(): { id: string; email: string } | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SESSION)
    if (raw) return JSON.parse(raw)
  } catch {}
  return null
}

export function setLocalSession(session: { id: string; email: string } | null): void {
  try {
    if (session) {
      localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(session))
    } else {
      localStorage.removeItem(STORAGE_KEY_SESSION)
    }
  } catch {}
}
