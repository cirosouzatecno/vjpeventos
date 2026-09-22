<template>
  <main class="admin-shell">
    <section v-if="!session" class="login-screen">
      <div class="login-card">
        <div class="brand">VJ <span>Produções & Eventos</span></div>
        <p class="eyebrow">Área administrativa</p>
        <h1>Gestão do site</h1>
        <p class="login-copy">Entre para administrar categorias, galerias, fotos e vídeos do site.</p>
        <form class="login-form" @submit.prevent="login">
          <label>E-mail<input v-model.trim="email" type="email" autocomplete="email" required /></label>
          <label>Senha<input v-model="password" type="password" autocomplete="current-password" required /></label>
          <button :disabled="busy">{{ busy ? 'Entrando...' : 'Entrar' }}</button>
          <p v-if="error" class="message message--error">{{ error }}</p>
        </form>
      </div>
    </section>

    <section v-else class="dashboard">
      <aside class="sidebar" :class="{ 'sidebar--open': menuOpen }">
        <div class="sidebar__top">
          <div class="brand brand--sidebar">VJ <span>Admin</span></div>
          <button class="sidebar__close" type="button" @click="menuOpen = false">×</button>
        </div>

        <nav class="nav">
          <button :class="{ active: view === 'dashboard' }" @click="openView('dashboard')">Visão geral</button>
          <button :class="{ active: view === 'media' && !activeCategoryId }" @click="openMedia()">Todas as mídias</button>
          <button :class="{ active: view === 'categories' }" @click="openView('categories')">Categorias</button>

          <div class="nav__group">
            <span>Galerias</span>
            <button
              v-for="category in categories"
              :key="category.id"
              :class="{ active: view === 'media' && activeCategoryId === category.id }"
              @click="openMedia(category.id)"
            >
              {{ category.name }}
              <small>{{ mediaCount(category.id) }}</small>
            </button>
          </div>
        </nav>

        <div class="sidebar__footer">
          <a href="/" target="_blank" rel="noopener">Abrir site ↗</a>
          <button type="button" @click="logout">Sair</button>
        </div>
      </aside>

      <div v-if="menuOpen" class="sidebar-backdrop" @click="menuOpen = false" />

      <section class="workspace">
        <header class="topbar">
          <button class="menu-button" type="button" @click="menuOpen = true">☰</button>
          <div>
            <p class="eyebrow">{{ currentEyebrow }}</p>
            <h1>{{ currentTitle }}</h1>
          </div>
          <button v-if="view === 'media'" class="primary" type="button" @click="startNewMedia">+ Adicionar mídia</button>
          <button v-else-if="view === 'categories'" class="primary" type="button" @click="startNewCategory">+ Nova categoria</button>
        </header>

        <p v-if="notice" class="message message--success">{{ notice }}</p>
        <p v-if="error" class="message message--error workspace-message">{{ error }}</p>

        <div v-if="loading" class="loading">Carregando conteúdo...</div>

        <template v-else>
          <section v-if="view === 'dashboard'" class="overview">
            <div class="stats">
              <article><span>Categorias</span><strong>{{ categories.length }}</strong></article>
              <article><span>Mídias</span><strong>{{ media.length }}</strong></article>
              <article><span>Publicadas</span><strong>{{ publishedCount }}</strong></article>
              <article><span>Destaques</span><strong>{{ featuredCount }}</strong></article>
            </div>

            <div class="overview-grid">
              <article class="panel">
                <div class="panel__heading"><div><p class="eyebrow">Biblioteca</p><h2>Conteúdo recente</h2></div><button class="text-button" @click="openMedia()">Ver tudo</button></div>
                <div class="recent-list">
                  <div v-for="item in media.slice(0, 6)" :key="item.id" class="recent-item">
                    <img v-if="previewUrl(item)" :src="previewUrl(item)" :alt="item.alt_text || item.title" />
                    <div class="placeholder" v-else>▶</div>
                    <div><strong>{{ item.title || 'Sem título' }}</strong><small>{{ categoryName(item.category_id) }} · {{ mediaLabel(item) }}</small></div>
                  </div>
                  <p v-if="!media.length" class="empty">Nenhuma mídia cadastrada ainda.</p>
                </div>
              </article>

              <article class="panel">
                <div class="panel__heading"><div><p class="eyebrow">Organização</p><h2>Galerias</h2></div></div>
                <button v-for="category in categories" :key="category.id" class="category-row" @click="openMedia(category.id)">
                  <span>{{ category.name }}</span><strong>{{ mediaCount(category.id) }}</strong>
                </button>
                <p v-if="!categories.length" class="empty">Crie a primeira categoria para começar.</p>
              </article>
            </div>
          </section>

          <section v-else-if="view === 'categories'" class="panel">
            <div class="panel__heading">
              <div><p class="eyebrow">Estrutura do site</p><h2>Categorias</h2></div>
              <span class="muted">{{ categories.length }} cadastradas</span>
            </div>

            <div class="table">
              <div v-for="category in categories" :key="category.id" class="table-row">
                <div class="table-row__main">
                  <strong>{{ category.name }}</strong>
                  <small>/{{ category.slug }} <template v-if="category.route_path">· {{ category.route_path }}</template></small>
                </div>
                <span class="pill">{{ mediaCount(category.id) }} mídias</span>
                <button class="icon-button" title="Abrir galeria" @click="openMedia(category.id)">Galeria</button>
                <button class="icon-button" title="Editar" @click="editCategory(category)">Editar</button>
                <button class="icon-button danger" title="Remover" @click="removeCategory(category)">Remover</button>
              </div>
              <p v-if="!categories.length" class="empty">Nenhuma categoria cadastrada.</p>
            </div>
          </section>

          <section v-else class="panel media-panel">
            <div class="media-toolbar">
              <div class="search">
                <input v-model.trim="search" type="search" placeholder="Buscar por título ou legenda..." />
                <select v-model="typeFilter">
                  <option value="">Todos os tipos</option>
                  <option value="image">Fotos</option>
                  <option value="video">Vídeos</option>
                  <option value="youtube">YouTube</option>
                </select>
              </div>
              <span class="muted">{{ filteredMedia.length }} itens</span>
            </div>

            <div class="media-grid">
              <article v-for="item in filteredMedia" :key="item.id" class="media-card">
                <div class="media-card__preview">
                  <img v-if="previewUrl(item)" :src="previewUrl(item)" :alt="item.alt_text || item.title" />
                  <div v-else class="video-placeholder">▶</div>
                  <span class="type-badge">{{ mediaLabel(item) }}</span>
                  <span v-if="item.featured" class="featured-badge">Destaque</span>
                </div>
                <div class="media-card__body">
                  <strong>{{ item.title || 'Sem título' }}</strong>
                  <p>{{ item.caption || 'Sem legenda' }}</p>
                  <label>
                    Categoria
                    <select :value="item.category_id || ''" @change="moveMedia(item, $event.target.value)">
                      <option value="">Sem categoria</option>
                      <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
                    </select>
                  </label>
                  <div class="media-card__actions">
                    <button @click="shiftOrder(item, -1)" title="Mover para cima">↑</button>
                    <button @click="shiftOrder(item, 1)" title="Mover para baixo">↓</button>
                    <button @click="editMedia(item)">Editar</button>
                    <button class="danger" @click="removeMedia(item)">Excluir</button>
                  </div>
                </div>
              </article>
            </div>
            <p v-if="!filteredMedia.length" class="empty">Nenhuma mídia encontrada nesta galeria.</p>
          </section>
        </template>
      </section>
    </section>

    <div v-if="categoryModal" class="modal" @click.self="categoryModal = false">
      <form class="modal-card" @submit.prevent="saveCategory">
        <div class="modal-card__heading"><div><p class="eyebrow">Categoria</p><h2>{{ categoryForm.id ? 'Editar categoria' : 'Nova categoria' }}</h2></div><button type="button" @click="categoryModal = false">×</button></div>
        <label>Nome<input v-model.trim="categoryForm.name" required @input="syncSlug" /></label>
        <label>Slug<input v-model.trim="categoryForm.slug" required /></label>
        <label>Rota do site<input v-model.trim="categoryForm.route_path" placeholder="/casamento" /></label>
        <label>Ordem<input v-model.number="categoryForm.sort_order" type="number" min="0" /></label>
        <label class="check"><input v-model="categoryForm.is_active" type="checkbox" /> Categoria ativa</label>
        <div class="modal-actions"><button type="button" class="secondary" @click="categoryModal = false">Cancelar</button><button class="primary" :disabled="busy">{{ busy ? 'Salvando...' : 'Salvar categoria' }}</button></div>
      </form>
    </div>

    <div v-if="mediaModal" class="modal" @click.self="closeMediaModal">
      <form class="modal-card modal-card--wide" @submit.prevent="saveMedia">
        <div class="modal-card__heading"><div><p class="eyebrow">Biblioteca</p><h2>{{ mediaForm.id ? 'Editar mídia' : 'Adicionar mídia' }}</h2></div><button type="button" @click="closeMediaModal">×</button></div>

        <div class="form-grid">
          <label>Título<input v-model.trim="mediaForm.title" required /></label>
          <label>Categoria
            <select v-model="mediaForm.category_id">
              <option value="">Sem categoria</option>
              <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
            </select>
          </label>
        </div>

        <label>Legenda<textarea v-model.trim="mediaForm.caption" rows="3" placeholder="Texto opcional exibido abaixo da mídia" /></label>
        <label>Texto alternativo<input v-model.trim="mediaForm.alt_text" placeholder="Descrição da foto para acessibilidade e SEO" /></label>

        <div class="source-box">
          <div class="source-tabs">
            <button type="button" :class="{ active: sourceMode === 'upload' }" @click="sourceMode = 'upload'">Enviar arquivo</button>
            <button type="button" :class="{ active: sourceMode === 'youtube' }" @click="sourceMode = 'youtube'">YouTube</button>
            <button type="button" :class="{ active: sourceMode === 'url' }" @click="sourceMode = 'url'">URL externa</button>
          </div>

          <label v-if="sourceMode === 'upload'" class="dropzone">
            <input type="file" accept="image/*,video/mp4,video/webm,video/quicktime" @change="onFileChange" />
            <strong>{{ selectedFile ? selectedFile.name : 'Escolher foto ou vídeo' }}</strong>
            <span>Imagens e vídeos. Para fotos, prefira JPG ou WebP otimizados.</span>
          </label>
          <label v-else-if="sourceMode === 'youtube'">Link ou ID do YouTube<input v-model.trim="mediaForm.youtube_id" placeholder="https://youtube.com/watch?v=..." /></label>
          <label v-else>URL da imagem ou vídeo<input v-model.trim="mediaForm.image_url" type="url" placeholder="https://..." /></label>
        </div>

        <div class="form-grid">
          <label>Ordem<input v-model.number="mediaForm.sort_order" type="number" min="0" /></label>
          <div class="checks">
            <label class="check"><input v-model="mediaForm.featured" type="checkbox" /> Destaque na página inicial</label>
            <label class="check"><input v-model="mediaForm.published" type="checkbox" /> Publicado no site</label>
          </div>
        </div>

        <div class="modal-actions"><button type="button" class="secondary" @click="closeMediaModal">Cancelar</button><button class="primary" :disabled="busy">{{ busy ? 'Salvando...' : 'Salvar mídia' }}</button></div>
      </form>
    </div>
  </main>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { isAdmin, requireSupabase, supabase, youtubeThumbnail } from '@/lib/supabase.js'

const session = ref(null)
const email = ref('')
const password = ref('')
const loading = ref(false)
const busy = ref(false)
const error = ref('')
const notice = ref('')
const view = ref('dashboard')
const menuOpen = ref(false)
const categories = ref([])
const media = ref([])
const activeCategoryId = ref('')
const search = ref('')
const typeFilter = ref('')
const categoryModal = ref(false)
const mediaModal = ref(false)
const sourceMode = ref('upload')
const selectedFile = ref(null)

const categoryForm = reactive({ id: '', name: '', slug: '', route_path: '', sort_order: 0, is_active: true })
const mediaForm = reactive({
  id: '', title: '', caption: '', alt_text: '', category_id: '', media_type: 'image',
  image_url: '', storage_path: '', youtube_id: '', featured: false, published: true, sort_order: 0,
})

const currentCategory = computed(() => categories.value.find((c) => c.id === activeCategoryId.value))
const currentTitle = computed(() => {
  if (view.value === 'dashboard') return 'Visão geral'
  if (view.value === 'categories') return 'Categorias'
  return currentCategory.value ? currentCategory.value.name : 'Biblioteca de mídia'
})
const currentEyebrow = computed(() => view.value === 'media' && currentCategory.value ? 'Galeria' : 'Administração')
const publishedCount = computed(() => media.value.filter((item) => item.published !== false).length)
const featuredCount = computed(() => media.value.filter((item) => item.featured).length)
const filteredMedia = computed(() => {
  const term = search.value.toLowerCase()
  return media.value.filter((item) => {
    if (activeCategoryId.value && item.category_id !== activeCategoryId.value) return false
    if (typeFilter.value && itemType(item) !== typeFilter.value) return false
    if (term && !`${item.title || ''} ${item.caption || ''}`.toLowerCase().includes(term)) return false
    return true
  })
})

function clearMessages() {
  error.value = ''
  notice.value = ''
}
function flash(message) {
  notice.value = message
  window.setTimeout(() => { if (notice.value === message) notice.value = '' }, 3000)
}
function slugify(value) {
  return (value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}
function syncSlug() {
  if (!categoryForm.id) categoryForm.slug = slugify(categoryForm.name)
}
function mediaCount(categoryId) {
  return media.value.filter((item) => item.category_id === categoryId).length
}
function categoryName(id) {
  return categories.value.find((c) => c.id === id)?.name || 'Sem categoria'
}
function itemType(item) {
  if (item.media_type) return item.media_type
  if (item.youtube_id) return 'youtube'
  return item.image_url && /\.(mp4|webm|mov)(\?|$)/i.test(item.image_url) ? 'video' : 'image'
}
function mediaLabel(item) {
  return { image: 'Foto', video: 'Vídeo', youtube: 'YouTube' }[itemType(item)] || 'Mídia'
}
function previewUrl(item) {
  if (itemType(item) === 'youtube' && item.youtube_id) return youtubeThumbnail(item.youtube_id)
  if (itemType(item) === 'image') return item.image_url || ''
  return ''
}
function normalizeYoutube(value) {
  if (!value) return ''
  const match = value.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([A-Za-z0-9_-]{6,})/)
  return match ? match[1] : value.trim()
}
function safeName(name) {
  const dot = name.lastIndexOf('.')
  const ext = dot >= 0 ? name.slice(dot).toLowerCase() : ''
  const base = dot >= 0 ? name.slice(0, dot) : name
  return `${slugify(base) || 'arquivo'}${ext}`
}

async function login() {
  clearMessages()
  busy.value = true
  try {
    const client = requireSupabase()
    const { data, error: loginError } = await client.auth.signInWithPassword({ email: email.value, password: password.value })
    if (loginError) throw loginError
    const allowed = await isAdmin()
    if (!allowed) {
      await client.auth.signOut()
      throw new Error('Este usuário não possui permissão administrativa.')
    }
    session.value = data.session
    password.value = ''
    await load()
  } catch (e) {
    error.value = e?.message || 'Não foi possível entrar no painel.'
  } finally {
    busy.value = false
  }
}

async function logout() {
  await supabase?.auth.signOut()
  session.value = null
  menuOpen.value = false
}

async function load() {
  loading.value = true
  clearMessages()
  try {
    const client = requireSupabase()
    const [categoryResult, mediaResult] = await Promise.all([
      client.from('categories').select('*').order('sort_order', { ascending: true }).order('name', { ascending: true }),
      client.from('media_items').select('*').order('sort_order', { ascending: true }).order('created_at', { ascending: false }),
    ])
    if (categoryResult.error) throw categoryResult.error
    if (mediaResult.error) throw mediaResult.error
    categories.value = categoryResult.data || []
    media.value = mediaResult.data || []
  } catch (e) {
    error.value = e?.message || 'Falha ao carregar o conteúdo.'
  } finally {
    loading.value = false
  }
}

function openView(next) {
  view.value = next
  activeCategoryId.value = ''
  menuOpen.value = false
}
function openMedia(categoryId = '') {
  view.value = 'media'
  activeCategoryId.value = categoryId
  search.value = ''
  typeFilter.value = ''
  menuOpen.value = false
}
function startNewCategory() {
  Object.assign(categoryForm, { id: '', name: '', slug: '', route_path: '', sort_order: categories.value.length, is_active: true })
  categoryModal.value = true
}
function editCategory(category) {
  Object.assign(categoryForm, {
    id: category.id, name: category.name || '', slug: category.slug || '',
    route_path: category.route_path || '', sort_order: category.sort_order ?? 0, is_active: category.is_active !== false,
  })
  categoryModal.value = true
}

async function saveCategory() {
  clearMessages()
  busy.value = true
  try {
    const client = requireSupabase()
    const payload = {
      name: categoryForm.name,
      slug: slugify(categoryForm.slug || categoryForm.name),
      route_path: categoryForm.route_path || null,
      sort_order: Number(categoryForm.sort_order) || 0,
      is_active: categoryForm.is_active,
      updated_at: new Date().toISOString(),
    }
    const result = categoryForm.id
      ? await client.from('categories').update(payload).eq('id', categoryForm.id)
      : await client.from('categories').insert(payload)
    if (result.error) throw result.error
    categoryModal.value = false
    await load()
    flash('Categoria salva com sucesso.')
  } catch (e) {
    error.value = e?.message || 'Não foi possível salvar a categoria.'
  } finally {
    busy.value = false
  }
}

async function removeCategory(category) {
  clearMessages()
  if (mediaCount(category.id)) {
    error.value = 'Esta categoria ainda possui mídias. Mova ou exclua esses itens antes de remover a categoria.'
    return
  }
  if (!window.confirm(`Remover a categoria "${category.name}"?`)) return
  const result = await requireSupabase().from('categories').delete().eq('id', category.id)
  if (result.error) error.value = result.error.message
  else { await load(); flash('Categoria removida.') }
}

function startNewMedia() {
  Object.assign(mediaForm, {
    id: '', title: '', caption: '', alt_text: '', category_id: activeCategoryId.value || '',
    media_type: 'image', image_url: '', storage_path: '', youtube_id: '',
    featured: false, published: true, sort_order: filteredMedia.value.length,
  })
  selectedFile.value = null
  sourceMode.value = 'upload'
  mediaModal.value = true
}
function editMedia(item) {
  Object.assign(mediaForm, {
    id: item.id, title: item.title || '', caption: item.caption || '', alt_text: item.alt_text || '',
    category_id: item.category_id || '', media_type: itemType(item), image_url: item.image_url || '',
    storage_path: item.storage_path || '', youtube_id: item.youtube_id || '',
    featured: Boolean(item.featured), published: item.published !== false, sort_order: item.sort_order ?? 0,
  })
  selectedFile.value = null
  sourceMode.value = item.youtube_id ? 'youtube' : (item.storage_path ? 'upload' : 'url')
  mediaModal.value = true
}
function closeMediaModal() {
  mediaModal.value = false
  selectedFile.value = null
}
function onFileChange(event) {
  selectedFile.value = event.target.files?.[0] || null
}

async function uploadSelectedFile() {
  if (!selectedFile.value) return null
  const client = requireSupabase()
  const category = categories.value.find((c) => c.id === mediaForm.category_id)
  const folder = category?.slug || 'sem-categoria'
  const path = `${folder}/${Date.now()}-${safeName(selectedFile.value.name)}`
  const { error: uploadError } = await client.storage.from('site-media').upload(path, selectedFile.value, {
    cacheControl: '3600',
    upsert: false,
    contentType: selectedFile.value.type || undefined,
  })
  if (uploadError) throw uploadError
  const { data } = client.storage.from('site-media').getPublicUrl(path)
  return {
    url: data.publicUrl,
    path,
    type: selectedFile.value.type?.startsWith('video/') ? 'video' : 'image',
  }
}

async function saveMedia() {
  clearMessages()
  busy.value = true
  let uploaded = null
  try {
    const client = requireSupabase()
    uploaded = sourceMode.value === 'upload' ? await uploadSelectedFile() : null
    const youtubeId = sourceMode.value === 'youtube' ? normalizeYoutube(mediaForm.youtube_id) : ''
    const mediaType = youtubeId ? 'youtube' : (uploaded?.type || (sourceMode.value === 'url' ? itemType({ image_url: mediaForm.image_url }) : mediaForm.media_type))
    const payload = {
      title: mediaForm.title,
      caption: mediaForm.caption || null,
      alt_text: mediaForm.alt_text || mediaForm.title,
      category_id: mediaForm.category_id || null,
      media_type: mediaType,
      image_url: uploaded?.url || (youtubeId ? null : mediaForm.image_url || null),
      storage_path: uploaded?.path || mediaForm.storage_path || null,
      youtube_id: youtubeId || null,
      featured: mediaForm.featured,
      published: mediaForm.published,
      sort_order: Number(mediaForm.sort_order) || 0,
      updated_at: new Date().toISOString(),
    }

    const result = mediaForm.id
      ? await client.from('media_items').update(payload).eq('id', mediaForm.id)
      : await client.from('media_items').insert(payload)
    if (result.error) throw result.error

    if (uploaded && mediaForm.id && mediaForm.storage_path && mediaForm.storage_path !== uploaded.path) {
      await client.storage.from('site-media').remove([mediaForm.storage_path])
    }

    closeMediaModal()
    await load()
    flash('Mídia salva e atualizada no site.')
  } catch (e) {
    if (uploaded?.path) await supabase?.storage.from('site-media').remove([uploaded.path])
    error.value = e?.message || 'Não foi possível salvar a mídia.'
  } finally {
    busy.value = false
  }
}

async function removeMedia(item) {
  clearMessages()
  if (!window.confirm(`Excluir "${item.title || 'esta mídia'}" do site?`)) return
  const client = requireSupabase()
  const result = await client.from('media_items').delete().eq('id', item.id)
  if (result.error) { error.value = result.error.message; return }
  if (item.storage_path) await client.storage.from('site-media').remove([item.storage_path])
  await load()
  flash('Mídia excluída.')
}

async function moveMedia(item, categoryId) {
  clearMessages()
  const result = await requireSupabase().from('media_items').update({
    category_id: categoryId || null,
    updated_at: new Date().toISOString(),
  }).eq('id', item.id)
  if (result.error) error.value = result.error.message
  else { item.category_id = categoryId || null; flash('Mídia movida para a nova categoria.') }
}

async function shiftOrder(item, direction) {
  const list = filteredMedia.value
  const index = list.findIndex((entry) => entry.id === item.id)
  const target = list[index + direction]
  if (!target) return
  const client = requireSupabase()
  const currentOrder = item.sort_order ?? index
  const targetOrder = target.sort_order ?? index + direction
  const [a, b] = await Promise.all([
    client.from('media_items').update({ sort_order: targetOrder }).eq('id', item.id),
    client.from('media_items').update({ sort_order: currentOrder }).eq('id', target.id),
  ])
  if (a.error || b.error) error.value = a.error?.message || b.error?.message
  else await load()
}

onMounted(async () => {
  if (!supabase) {
    error.value = 'Supabase não configurado. Defina VITE_SUPABASE_URL e VITE_SUPABASE_PUBLISHABLE_KEY na Vercel.'
    return
  }
  const { data } = await supabase.auth.getSession()
  if (!data.session) return
  const allowed = await isAdmin()
  if (!allowed) {
    await supabase.auth.signOut()
    error.value = 'Este usuário não possui permissão administrativa.'
    return
  }
  session.value = data.session
  await load()
})
</script>

<style scoped>
*{box-sizing:border-box}.admin-shell{min-height:100vh;background:#f4f0e8;color:#18382b;font-family:"Plus Jakarta Sans",Arial,sans-serif}.eyebrow{margin:0;color:#a77b38;font-size:10px;font-weight:700;letter-spacing:.18em;text-transform:uppercase}.brand{font-family:Georgia,serif;font-size:22px;letter-spacing:.12em}.brand span{display:block;margin-top:4px;color:#a77b38;font:600 9px/1 Arial,sans-serif;letter-spacing:.24em;text-transform:uppercase}.login-screen{display:grid;min-height:100vh;place-items:center;padding:24px;background:radial-gradient(circle at top right,rgba(167,123,56,.12),transparent 28%),#f4f0e8}.login-card{width:min(100%,460px);padding:48px;background:#fff;box-shadow:0 24px 70px rgba(24,56,43,.08)}.login-card .brand{margin-bottom:72px}.login-card h1,.topbar h1,.panel h2,.modal-card h2{font-family:Georgia,serif;font-weight:400}.login-card h1{margin:10px 0 12px;font-size:48px}.login-copy{margin:0 0 30px;color:#6f756f;font-size:14px;line-height:1.7}.login-form{display:grid;gap:16px}.login-form label,.modal-card label,.media-card label{display:grid;gap:7px;color:#56645b;font-size:11px;font-weight:600}.login-form input,.modal-card input,.modal-card select,.modal-card textarea,.media-toolbar input,.media-toolbar select,.media-card select{width:100%;border:1px solid #d6d0c4;border-radius:0;background:#fff;padding:13px 14px;color:#18382b;font:inherit;outline:none}.login-form input:focus,.modal-card input:focus,.modal-card select:focus,.modal-card textarea:focus,.media-toolbar input:focus,.media-toolbar select:focus,.media-card select:focus{border-color:#a77b38}.login-form button,.primary{border:0;background:#18382b;color:#fff;padding:14px 18px;font-weight:700;cursor:pointer}.login-form button:disabled,.primary:disabled{opacity:.55;cursor:wait}.dashboard{display:grid;min-height:100vh;grid-template-columns:260px 1fr}.sidebar{position:sticky;top:0;height:100vh;display:flex;flex-direction:column;background:#10291f;color:#f4f0e8;padding:28px 20px;z-index:40}.sidebar__top{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:44px}.brand--sidebar{color:#fff}.sidebar__close{display:none}.nav{display:grid;gap:5px;overflow:auto}.nav button{display:flex;align-items:center;justify-content:space-between;width:100%;border:0;background:transparent;color:#aebbb3;padding:11px 12px;text-align:left;cursor:pointer}.nav button:hover,.nav button.active{background:rgba(255,255,255,.08);color:#fff}.nav button small{color:#72877b;font-size:10px}.nav__group{display:grid;gap:4px;margin-top:24px;padding-top:20px;border-top:1px solid rgba(255,255,255,.09)}.nav__group>span{padding:0 12px 8px;color:#a77b38;font-size:9px;font-weight:800;letter-spacing:.18em;text-transform:uppercase}.sidebar__footer{display:flex;align-items:center;justify-content:space-between;margin-top:auto;padding-top:24px;border-top:1px solid rgba(255,255,255,.09)}.sidebar__footer a,.sidebar__footer button{border:0;background:transparent;color:#aebbb3;font-size:11px;text-decoration:none;cursor:pointer}.workspace{min-width:0;padding:38px clamp(22px,4vw,58px) 70px}.topbar{display:flex;align-items:center;gap:22px;min-height:90px;margin-bottom:32px;border-bottom:1px solid #d9d2c6;padding-bottom:26px}.topbar>div{flex:1}.topbar h1{margin:8px 0 0;font-size:42px;line-height:1}.menu-button{display:none;border:0;background:#18382b;color:white;width:42px;height:42px;font-size:20px}.message{margin:12px 0;padding:12px 14px;font-size:12px}.message--error{background:#f7e8e5;color:#9a3b2c}.message--success{background:#e5efe7;color:#275d3b}.workspace-message{margin-top:-15px;margin-bottom:22px}.loading,.empty{padding:28px 0;color:#858a85;font-size:13px}.stats{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px;margin-bottom:24px}.stats article{background:#fff;padding:24px}.stats span{display:block;color:#7f867f;font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase}.stats strong{display:block;margin-top:14px;font:400 38px Georgia,serif}.overview-grid{display:grid;grid-template-columns:1.3fr .7fr;gap:24px}.panel{background:#fff;padding:26px}.panel__heading{display:flex;align-items:flex-start;justify-content:space-between;gap:20px;margin-bottom:24px}.panel h2{margin:7px 0 0;font-size:30px}.text-button,.icon-button{border:0;background:transparent;color:#52665b;cursor:pointer}.recent-list{display:grid;gap:10px}.recent-item{display:grid;grid-template-columns:74px 1fr;align-items:center;gap:14px;padding:9px 0;border-top:1px solid #eee9e0}.recent-item img,.recent-item .placeholder{width:74px;height:52px;object-fit:cover;background:#e7e2d9;display:grid;place-items:center}.recent-item strong,.recent-item small{display:block}.recent-item strong{font-size:13px}.recent-item small{margin-top:5px;color:#899089;font-size:10px}.category-row{display:flex;width:100%;align-items:center;justify-content:space-between;border:0;border-top:1px solid #eee9e0;background:transparent;padding:15px 2px;color:#18382b;text-align:left;cursor:pointer}.category-row strong{font:400 22px Georgia,serif}.muted{color:#8a8f89;font-size:11px}.table{display:grid}.table-row{display:grid;grid-template-columns:1fr auto auto auto auto;align-items:center;gap:12px;border-top:1px solid #eee9e0;padding:14px 0}.table-row__main strong,.table-row__main small{display:block}.table-row__main strong{font-size:13px}.table-row__main small{margin-top:5px;color:#8a8f89;font-size:10px}.pill{background:#f3efe7;padding:7px 9px;color:#6d766f;font-size:9px}.danger{color:#a24031!important}.media-toolbar{display:flex;align-items:center;justify-content:space-between;gap:18px;margin-bottom:24px}.search{display:flex;gap:10px;flex:1}.search input{max-width:440px}.media-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px}.media-card{border:1px solid #e6e0d6;background:#fff}.media-card__preview{position:relative;aspect-ratio:4/3;overflow:hidden;background:#e9e5dc}.media-card__preview img{width:100%;height:100%;object-fit:cover}.video-placeholder{display:grid;width:100%;height:100%;place-items:center;color:#a77b38;font-size:34px}.type-badge,.featured-badge{position:absolute;top:10px;padding:6px 8px;background:rgba(16,41,31,.88);color:white;font-size:8px;font-weight:800;letter-spacing:.08em;text-transform:uppercase}.type-badge{left:10px}.featured-badge{right:10px;background:#a77b38}.media-card__body{padding:14px}.media-card__body>strong{display:block;font-size:13px}.media-card__body>p{min-height:36px;margin:7px 0 13px;color:#858b86;font-size:10px;line-height:1.5}.media-card select{padding:9px;font-size:10px}.media-card__actions{display:flex;gap:5px;margin-top:11px}.media-card__actions button{border:1px solid #ddd6ca;background:white;padding:7px 9px;color:#52665b;font-size:9px;cursor:pointer}.modal{position:fixed;inset:0;z-index:100;display:grid;place-items:center;overflow:auto;padding:28px;background:rgba(7,20,14,.72)}.modal-card{width:min(100%,580px);display:grid;gap:16px;background:#fff;padding:28px}.modal-card--wide{width:min(100%,760px)}.modal-card__heading{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:6px}.modal-card__heading h2{margin:7px 0 0;font-size:32px}.modal-card__heading>button{border:0;background:transparent;color:#18382b;font-size:28px;cursor:pointer}.form-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}.check{display:flex!important;grid-template-columns:auto 1fr!important;align-items:center!important;justify-content:flex-start!important;gap:8px!important}.check input{width:auto!important}.checks{display:grid;align-content:center;gap:10px}.source-box{border:1px solid #e4ded3;padding:14px}.source-tabs{display:flex;gap:5px;margin-bottom:14px}.source-tabs button{border:0;background:#f1ede5;padding:9px 11px;color:#6f776f;font-size:10px;cursor:pointer}.source-tabs button.active{background:#18382b;color:white}.dropzone{position:relative;place-items:center!important;border:1px dashed #c8bfae;padding:26px;text-align:center;cursor:pointer}.dropzone input{position:absolute;inset:0;width:100%;opacity:0;cursor:pointer}.dropzone strong{color:#18382b}.dropzone span{color:#8a8f89;font-size:10px}.modal-actions{display:flex;justify-content:flex-end;gap:10px;margin-top:6px}.secondary{border:1px solid #cfc7ba;background:white;color:#18382b;padding:13px 16px;cursor:pointer}.sidebar-backdrop{display:none}
@media(max-width:1050px){.media-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.overview-grid{grid-template-columns:1fr}.stats{grid-template-columns:repeat(2,1fr)}}
@media(max-width:800px){.dashboard{grid-template-columns:1fr}.sidebar{position:fixed;left:0;top:0;width:min(84vw,300px);transform:translateX(-105%);transition:transform .2s ease}.sidebar--open{transform:translateX(0)}.sidebar__close{display:block;border:0;background:transparent;color:white;font-size:28px}.sidebar-backdrop{position:fixed;inset:0;z-index:30;display:block;background:rgba(0,0,0,.35)}.workspace{padding:24px 16px 54px}.menu-button{display:block}.topbar{align-items:flex-start}.topbar h1{font-size:34px}.topbar .primary{align-self:center;padding:11px 12px;font-size:10px}.table-row{grid-template-columns:1fr auto}.table-row .pill{display:none}.media-grid{grid-template-columns:1fr}.media-toolbar,.search{align-items:stretch;flex-direction:column}.form-grid{grid-template-columns:1fr}.login-card{padding:34px 24px}.login-card .brand{margin-bottom:52px}.login-card h1{font-size:40px}}
</style>
