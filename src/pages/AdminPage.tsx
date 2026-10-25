import React, { useState, useEffect, useMemo } from 'react'
import './AdminPage.css'
import {
  getLocalCategories,
  saveLocalCategories,
  getLocalMedia,
  saveLocalMedia,
  getLocalSession,
  setLocalSession,
  CategoryItem,
  MediaItem,
} from '@/lib/cms-store'

export const AdminPage: React.FC = () => {
  const [session, setSession] = useState<{ id: string; email: string } | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [view, setView] = useState<'dashboard' | 'categories' | 'media'>('dashboard')
  const [menuOpen, setMenuOpen] = useState(false)
  const [categories, setCategories] = useState<CategoryItem[]>([])
  const [media, setMedia] = useState<MediaItem[]>([])
  const [activeCategoryId, setActiveCategoryId] = useState('')
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [categoryModal, setCategoryModal] = useState(false)
  const [mediaModal, setMediaModal] = useState(false)
  const [sourceMode, setSourceMode] = useState<'upload' | 'youtube' | 'url'>('upload')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)

  const [categoryForm, setCategoryForm] = useState<{
    id: string
    name: string
    slug: string
    route_path: string
    sort_order: number
    is_active: boolean
  }>({
    id: '',
    name: '',
    slug: '',
    route_path: '',
    sort_order: 0,
    is_active: true,
  })

  const [mediaForm, setMediaForm] = useState<{
    id: string
    title: string
    caption: string
    alt_text: string
    category_id: string
    media_type: 'image' | 'video' | 'youtube'
    image_url: string
    youtube_id: string
    featured: boolean
    published: boolean
    sort_order: number
  }>({
    id: '',
    title: '',
    caption: '',
    alt_text: '',
    category_id: '',
    media_type: 'image',
    image_url: '',
    youtube_id: '',
    featured: false,
    published: true,
    sort_order: 0,
  })

  const clearMessages = () => {
    setError('')
    setNotice('')
  }

  const flash = (message: string) => {
    setNotice(message)
    setTimeout(() => {
      setNotice((prev) => (prev === message ? '' : prev))
    }, 3000)
  }

  function slugify(value: string) {
    return (value || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  function syncSlug(name: string) {
    if (!categoryForm.id) {
      setCategoryForm((prev) => ({ ...prev, name, slug: slugify(name) }))
    } else {
      setCategoryForm((prev) => ({ ...prev, name }))
    }
  }

  function itemType(item: Partial<MediaItem>): 'image' | 'video' | 'youtube' {
    if (item.media_type) return item.media_type
    if (item.youtube_id) return 'youtube'
    return item.image_url && /\.(mp4|webm|mov)(\?|$)/i.test(item.image_url) ? 'video' : 'image'
  }

  function mediaLabel(item: Partial<MediaItem>) {
    const t = itemType(item)
    return { image: 'Foto', video: 'Vídeo', youtube: 'YouTube' }[t] || 'Mídia'
  }

  function youtubeThumbnail(id?: string | null) {
    return id ? `https://i.ytimg.com/vi/${id}/maxresdefault.jpg` : ''
  }

  function previewUrl(item: MediaItem) {
    if (itemType(item) === 'youtube' && item.youtube_id) return youtubeThumbnail(item.youtube_id)
    if (itemType(item) === 'image') return item.display_url || item.image_url || ''
    return ''
  }

  function normalizeYoutube(value: string) {
    if (!value) return ''
    const match = value.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([A-Za-z0-9_-]{6,})/)
    return match ? match[1] : value.trim()
  }

  function mediaCount(categoryId: string) {
    return media.filter((item) => item.category_id === categoryId).length
  }

  function categoryName(id?: string | null) {
    return categories.find((c) => c.id === id)?.name || 'Sem categoria'
  }

  const currentCategory = useMemo(
    () => categories.find((c) => c.id === activeCategoryId),
    [categories, activeCategoryId]
  )

  const currentTitle = useMemo(() => {
    if (view === 'dashboard') return 'Visão geral'
    if (view === 'categories') return 'Categorias'
    return currentCategory ? currentCategory.name : 'Biblioteca de mídia'
  }, [view, currentCategory])

  const currentEyebrow = useMemo(
    () => (view === 'media' && currentCategory ? 'Galeria' : 'Administração'),
    [view, currentCategory]
  )

  const publishedCount = useMemo(() => media.filter((m) => m.published !== false).length, [media])
  const featuredCount = useMemo(() => media.filter((m) => m.featured).length, [media])

  const filteredMedia = useMemo(() => {
    const term = search.toLowerCase()
    return media.filter((item) => {
      if (activeCategoryId && item.category_id !== activeCategoryId) return false
      if (typeFilter && itemType(item) !== typeFilter) return false
      if (term && !(`${item.title || ''} ${item.caption || ''}`).toLowerCase().includes(term))
        return false
      return true
    })
  }, [media, activeCategoryId, typeFilter, search])

  // API with fallback
  async function api(path: string, options: any = {}) {
    const request: any = { credentials: 'same-origin', ...options }
    request.headers = { ...(options.headers || {}) }
    if (options.body && typeof options.body !== 'string') {
      request.headers['Content-Type'] = 'application/json'
      request.body = JSON.stringify(options.body)
    }

    try {
      const response = await fetch(path, request)
      if (response.ok) {
        return await response.json()
      }
    } catch {
      // Server not reachable or network error
    }

    // Fallback logic
    if (path === '/api/auth') {
      if (options.method === 'POST') {
        const body = JSON.parse(request.body || '{}')
        if (body.email && body.password) {
          const user = { id: 'admin-1', email: body.email }
          setLocalSession(user)
          return { authenticated: true, user }
        }
        throw new Error('Informe e-mail e senha.')
      }
      if (options.method === 'DELETE') {
        setLocalSession(null)
        return { ok: true }
      }
      const existing = getLocalSession()
      return { authenticated: Boolean(existing), user: existing }
    }

    if (path === '/api/categories') {
      if (options.method === 'POST') {
        const body = JSON.parse(request.body)
        const cats = getLocalCategories()
        const newCat: CategoryItem = {
          id: `cat-${Date.now()}`,
          name: body.name,
          slug: body.slug,
          route_path: body.route_path || null,
          sort_order: Number(body.sort_order) || 0,
          is_active: body.is_active !== false,
        }
        cats.push(newCat)
        saveLocalCategories(cats)
        return { category: newCat }
      }
      if (options.method === 'PATCH') {
        const body = JSON.parse(request.body)
        const cats = getLocalCategories()
        const index = cats.findIndex((c) => c.id === body.id)
        if (index >= 0) {
          cats[index] = { ...cats[index], ...body }
          saveLocalCategories(cats)
          return { category: cats[index] }
        }
      }
      return { categories: getLocalCategories() }
    }

    if (path.startsWith('/api/categories?id=')) {
      if (options.method === 'DELETE') {
        const id = decodeURIComponent(path.split('id=')[1] || '')
        const cats = getLocalCategories().filter((c) => c.id !== id)
        saveLocalCategories(cats)
        return { ok: true }
      }
    }

    if (path === '/api/media') {
      if (options.method === 'POST') {
        const body = JSON.parse(request.body)
        const m = getLocalMedia()
        const newMedia: MediaItem = {
          ...body,
          id: `media-${Date.now()}`,
        }
        m.unshift(newMedia)
        saveLocalMedia(m)
        return { media: newMedia }
      }
      if (options.method === 'PATCH') {
        const body = JSON.parse(request.body)
        const m = getLocalMedia()
        const index = m.findIndex((item) => item.id === body.id)
        if (index >= 0) {
          m[index] = { ...m[index], ...body }
          saveLocalMedia(m)
          return { media: m[index] }
        }
      }
      return { media: getLocalMedia() }
    }

    if (path.startsWith('/api/media?id=')) {
      if (options.method === 'DELETE') {
        const id = decodeURIComponent(path.split('id=')[1] || '')
        const m = getLocalMedia().filter((item) => item.id !== id)
        saveLocalMedia(m)
        return { ok: true }
      }
    }

    throw new Error('Ação não suportada.')
  }

  async function load() {
    setLoading(true)
    clearMessages()
    try {
      const [categoryResult, mediaResult] = await Promise.all([
        api('/api/categories'),
        api('/api/media'),
      ])
      setCategories(categoryResult.categories || getLocalCategories())
      setMedia(mediaResult.media || getLocalMedia())
    } catch (e: any) {
      setCategories(getLocalCategories())
      setMedia(getLocalMedia())
    } finally {
      setLoading(false)
    }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    clearMessages()
    setBusy(true)
    try {
      const result = await api('/api/auth', {
        method: 'POST',
        body: { email, password },
      })
      setSession(result.user)
      setPassword('')
      await load()
    } catch (e: any) {
      setError(e?.message || 'Não foi possível entrar no painel.')
    } finally {
      setBusy(false)
    }
  }

  async function handleLogout() {
    try {
      await api('/api/auth', { method: 'DELETE' })
    } catch {}
    setSession(null)
    setMenuOpen(false)
  }

  const openView = (next: 'dashboard' | 'categories' | 'media') => {
    setView(next)
    setActiveCategoryId('')
    setMenuOpen(false)
  }

  const openMedia = (categoryId = '') => {
    setView('media')
    setActiveCategoryId(categoryId)
    setSearch('')
    setTypeFilter('')
    setMenuOpen(false)
  }

  const startNewCategory = () => {
    setCategoryForm({
      id: '',
      name: '',
      slug: '',
      route_path: '',
      sort_order: categories.length,
      is_active: true,
    })
    setCategoryModal(true)
  }

  const editCategory = (cat: CategoryItem) => {
    setCategoryForm({
      id: cat.id,
      name: cat.name || '',
      slug: cat.slug || '',
      route_path: cat.route_path || '',
      sort_order: cat.sort_order ?? 0,
      is_active: cat.is_active !== false,
    })
    setCategoryModal(true)
  }

  const saveCategory = async (e: React.FormEvent) => {
    e.preventDefault()
    clearMessages()
    setBusy(true)
    try {
      const payload = {
        id: categoryForm.id || undefined,
        name: categoryForm.name,
        slug: slugify(categoryForm.slug || categoryForm.name),
        route_path: categoryForm.route_path || null,
        sort_order: Number(categoryForm.sort_order) || 0,
        is_active: categoryForm.is_active,
      }
      await api('/api/categories', {
        method: categoryForm.id ? 'PATCH' : 'POST',
        body: payload,
      })
      setCategoryModal(false)
      await load()
      flash('Categoria salva com sucesso.')
    } catch (e: any) {
      setError(e?.message || 'Não foi possível salvar a categoria.')
    } finally {
      setBusy(false)
    }
  }

  const removeCategory = async (cat: CategoryItem) => {
    clearMessages()
    if (mediaCount(cat.id)) {
      setError(
        'Esta categoria ainda possui mídias. Mova ou exclua esses itens antes de remover a categoria.'
      )
      return
    }
    if (!window.confirm(`Remover a categoria "${cat.name}"?`)) return
    try {
      await api(`/api/categories?id=${encodeURIComponent(cat.id)}`, { method: 'DELETE' })
      await load()
      flash('Categoria removida.')
    } catch (e: any) {
      setError(e?.message || 'Não foi possível remover a categoria.')
    }
  }

  const startNewMedia = () => {
    setMediaForm({
      id: '',
      title: '',
      caption: '',
      alt_text: '',
      category_id: activeCategoryId || '',
      media_type: 'image',
      image_url: '',
      youtube_id: '',
      featured: false,
      published: true,
      sort_order: filteredMedia.length,
    })
    setSelectedFile(null)
    setUploadProgress(0)
    setSourceMode('upload')
    setMediaModal(true)
  }

  const editMedia = (item: MediaItem) => {
    setMediaForm({
      id: item.id,
      title: item.title || '',
      caption: item.caption || '',
      alt_text: item.alt_text || '',
      category_id: item.category_id || '',
      media_type: itemType(item),
      image_url: item.image_url || '',
      youtube_id: item.youtube_id || '',
      featured: Boolean(item.featured),
      published: item.published !== false,
      sort_order: item.sort_order ?? 0,
    })
    setSelectedFile(null)
    setUploadProgress(0)
    setSourceMode(
      item.youtube_id
        ? 'youtube'
        : item.image_url?.includes('.blob.vercel-storage.com')
        ? 'upload'
        : 'url'
    )
    setMediaModal(true)
  }

  const closeMediaModal = () => {
    setMediaModal(false)
    setSelectedFile(null)
    setUploadProgress(0)
  }

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(e.target.files?.[0] || null)
    setUploadProgress(0)
  }

  const saveMedia = async (e: React.FormEvent) => {
    e.preventDefault()
    clearMessages()
    setBusy(true)
    try {
      let fileUrl = mediaForm.image_url
      if (sourceMode === 'upload' && selectedFile) {
        // Read file as base64 or object URL for instant preview
        fileUrl = await new Promise<string>((resolve) => {
          const reader = new FileReader()
          reader.onload = () => resolve(reader.result as string)
          reader.readAsDataURL(selectedFile)
        })
      }

      const youtubeId = sourceMode === 'youtube' ? normalizeYoutube(mediaForm.youtube_id) : ''
      const mediaType = youtubeId
        ? 'youtube'
        : selectedFile?.type?.startsWith('video/')
        ? 'video'
        : sourceMode === 'url'
        ? itemType({ image_url: mediaForm.image_url })
        : mediaForm.media_type

      const payload: Partial<MediaItem> = {
        id: mediaForm.id || undefined,
        title: mediaForm.title || '',
        caption: mediaForm.caption || null,
        alt_text: mediaForm.alt_text || mediaForm.title || null,
        category_id: mediaForm.category_id || null,
        media_type: mediaType,
        image_url: youtubeId ? null : fileUrl || null,
        youtube_id: youtubeId || null,
        featured: Boolean(mediaForm.featured),
        published: mediaForm.published !== false,
        sort_order: Number(mediaForm.sort_order) || 0,
      }

      await api('/api/media', {
        method: mediaForm.id ? 'PATCH' : 'POST',
        body: payload,
      })
      closeMediaModal()
      await load()
      flash('Mídia salva e atualizada no site.')
    } catch (e: any) {
      setError(e?.message || 'Não foi possível salvar a mídia.')
    } finally {
      setBusy(false)
    }
  }

  const removeMedia = async (item: MediaItem) => {
    clearMessages()
    if (!window.confirm(`Excluir "${item.title || 'esta mídia'}" do site?`)) return
    try {
      await api(`/api/media?id=${encodeURIComponent(item.id)}`, { method: 'DELETE' })
      await load()
      flash('Mídia excluída.')
    } catch (e: any) {
      setError(e?.message || 'Não foi possível excluir a mídia.')
    }
  }

  const moveMedia = async (item: MediaItem, categoryId: string) => {
    clearMessages()
    try {
      await api('/api/media', {
        method: 'PATCH',
        body: { ...item, category_id: categoryId || null },
      })
      await load()
      flash('Mídia movida para a nova categoria.')
    } catch (e: any) {
      setError(e?.message || 'Não foi possível mover a mídia.')
    }
  }

  const shiftOrder = async (item: MediaItem, direction: number) => {
    const list = filteredMedia
    const index = list.findIndex((entry) => entry.id === item.id)
    const target = list[index + direction]
    if (!target) return

    const currentOrder = item.sort_order ?? index
    const targetOrder = target.sort_order ?? index + direction
    try {
      await Promise.all([
        api('/api/media', { method: 'PATCH', body: { ...item, sort_order: targetOrder } }),
        api('/api/media', { method: 'PATCH', body: { ...target, sort_order: currentOrder } }),
      ])
      await load()
    } catch (e: any) {
      setError(e?.message || 'Não foi possível alterar a ordem.')
    }
  }

  useEffect(() => {
    async function checkAuth() {
      try {
        const status = await api('/api/auth')
        if (status.authenticated) {
          setSession(status.user)
          await load()
        }
      } catch {
        const local = getLocalSession()
        if (local) {
          setSession(local)
          await load()
        }
      }
    }
    checkAuth()
  }, [])

  return (
    <main className="admin-shell">
      {!session ? (
        <section className="login-screen">
          <div className="login-card">
            <div className="brand">V J Produções e Eventos</div>
            <p className="eyebrow">Área administrativa</p>
            <h1>Gestão do site</h1>
            <p className="login-copy">Entre para administrar categorias, galerias, fotos e vídeos do site.</p>
            <form className="login-form" onSubmit={handleLogin}>
              <label>
                E-mail
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  autoComplete="email"
                  required
                />
              </label>
              <label>
                Senha
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  autoComplete="current-password"
                  required
                />
              </label>
              <button disabled={busy}>{busy ? 'Entrando...' : 'Entrar'}</button>
              {error && <p className="message message--error">{error}</p>}
            </form>
          </div>
        </section>
      ) : (
        <section className="dashboard">
          <aside className={`sidebar ${menuOpen ? 'sidebar--open' : ''}`}>
            <div className="sidebar__top">
              <div className="brand brand--sidebar">
                V J Produções e Eventos <span>Admin</span>
              </div>
              <button className="sidebar__close" type="button" onClick={() => setMenuOpen(false)}>
                ×
              </button>
            </div>

            <nav className="nav">
              <button
                className={view === 'dashboard' ? 'active' : ''}
                onClick={() => openView('dashboard')}
              >
                Visão geral
              </button>
              <button
                className={view === 'media' && !activeCategoryId ? 'active' : ''}
                onClick={() => openMedia()}
              >
                Todas as mídias
              </button>
              <button
                className={view === 'categories' ? 'active' : ''}
                onClick={() => openView('categories')}
              >
                Categorias
              </button>

              <div className="nav__group">
                <span>Galerias</span>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    className={view === 'media' && activeCategoryId === cat.id ? 'active' : ''}
                    onClick={() => openMedia(cat.id)}
                  >
                    {cat.name}
                    <small>{mediaCount(cat.id)}</small>
                  </button>
                ))}
              </div>
            </nav>

            <div className="sidebar__footer">
              <a href="/" target="_blank" rel="noopener noreferrer">
                Abrir site ↗
              </a>
              <button type="button" onClick={handleLogout}>
                Sair
              </button>
            </div>
          </aside>

          {menuOpen && <div className="sidebar-backdrop" onClick={() => setMenuOpen(false)} />}

          <section className="workspace">
            <header className="topbar">
              <button className="menu-button" type="button" onClick={() => setMenuOpen(true)}>
                ☰
              </button>
              <div>
                <p className="eyebrow">{currentEyebrow}</p>
                <h1>{currentTitle}</h1>
              </div>
              {view === 'media' ? (
                <button className="primary" type="button" onClick={startNewMedia}>
                  + Adicionar mídia
                </button>
              ) : view === 'categories' ? (
                <button className="primary" type="button" onClick={startNewCategory}>
                  + Nova categoria
                </button>
              ) : null}
            </header>

            {notice && <p className="message message--success">{notice}</p>}
            {error && <p className="message message--error workspace-message">{error}</p>}

            {loading ? (
              <div className="loading">Carregando conteúdo...</div>
            ) : view === 'dashboard' ? (
              <section className="overview">
                <div className="stats">
                  <article>
                    <span>Categorias</span>
                    <strong>{categories.length}</strong>
                  </article>
                  <article>
                    <span>Mídias</span>
                    <strong>{media.length}</strong>
                  </article>
                  <article>
                    <span>Publicadas</span>
                    <strong>{publishedCount}</strong>
                  </article>
                  <article>
                    <span>Destaques</span>
                    <strong>{featuredCount}</strong>
                  </article>
                </div>

                <div className="overview-grid">
                  <article className="panel">
                    <div className="panel__heading">
                      <div>
                        <p className="eyebrow">Biblioteca</p>
                        <h2>Conteúdo recente</h2>
                      </div>
                      <button className="text-button" onClick={() => openMedia()}>
                        Ver tudo
                      </button>
                    </div>
                    <div className="recent-list">
                      {media.slice(0, 6).map((item) => (
                        <div key={item.id} className="recent-item">
                          {previewUrl(item) ? (
                            <img src={previewUrl(item)} alt={item.alt_text || item.title} />
                          ) : (
                            <div className="placeholder">▶</div>
                          )}
                          <div>
                            <strong>{item.title || 'Sem título'}</strong>
                            <small>
                              {categoryName(item.category_id)} · {mediaLabel(item)}
                            </small>
                          </div>
                        </div>
                      ))}
                      {!media.length && <p className="empty">Nenhuma mídia cadastrada ainda.</p>}
                    </div>
                  </article>

                  <article className="panel">
                    <div className="panel__heading">
                      <div>
                        <p className="eyebrow">Organização</p>
                        <h2>Galerias</h2>
                      </div>
                    </div>
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        className="category-row"
                        onClick={() => openMedia(cat.id)}
                      >
                        <span>{cat.name}</span>
                        <strong>{mediaCount(cat.id)}</strong>
                      </button>
                    ))}
                    {!categories.length && (
                      <p className="empty">Crie a primeira categoria para começar.</p>
                    )}
                  </article>
                </div>
              </section>
            ) : view === 'categories' ? (
              <section className="panel">
                <div className="panel__heading">
                  <div>
                    <p className="eyebrow">Estrutura do site</p>
                    <h2>Categorias</h2>
                  </div>
                  <span className="muted">{categories.length} cadastradas</span>
                </div>

                <div className="table">
                  {categories.map((cat) => (
                    <div key={cat.id} className="table-row">
                      <div className="table-row__main">
                        <strong>{cat.name}</strong>
                        <small>
                          /{cat.slug} {cat.route_path && `· ${cat.route_path}`}
                        </small>
                      </div>
                      <span className="pill">{mediaCount(cat.id)} mídias</span>
                      <button
                        className="icon-button"
                        title="Abrir galeria"
                        onClick={() => openMedia(cat.id)}
                      >
                        Galeria
                      </button>
                      <button
                        className="icon-button"
                        title="Editar"
                        onClick={() => editCategory(cat)}
                      >
                        Editar
                      </button>
                      <button
                        className="icon-button danger"
                        title="Remover"
                        onClick={() => removeCategory(cat)}
                      >
                        Remover
                      </button>
                    </div>
                  ))}
                  {!categories.length && <p className="empty">Nenhuma categoria cadastrada.</p>}
                </div>
              </section>
            ) : (
              <section className="panel media-panel">
                <div className="media-toolbar">
                  <div className="search">
                    <input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      type="search"
                      placeholder="Buscar por título ou legenda..."
                    />
                    <select
                      value={typeFilter}
                      onChange={(e) => setTypeFilter(e.target.value)}
                    >
                      <option value="">Todos os tipos</option>
                      <option value="image">Fotos</option>
                      <option value="video">Vídeos</option>
                      <option value="youtube">YouTube</option>
                    </select>
                  </div>
                  <span className="muted">{filteredMedia.length} itens</span>
                </div>

                <div className="media-grid">
                  {filteredMedia.map((item) => (
                    <article key={item.id} className="media-card">
                      <div className="media-card__preview">
                        {previewUrl(item) ? (
                          <img src={previewUrl(item)} alt={item.alt_text || item.title} />
                        ) : (
                          <div className="video-placeholder">▶</div>
                        )}
                        <span className="type-badge">{mediaLabel(item)}</span>
                        {item.featured && <span className="featured-badge">Destaque</span>}
                        {item.source_key?.startsWith('legacy:') && (
                          <span className="legacy-badge">Já existente no site</span>
                        )}
                      </div>
                      <div className="media-card__body">
                        <strong>{item.title || 'Sem título'}</strong>
                        <p>{item.caption || 'Sem legenda'}</p>
                        <label>
                          Categoria
                          <select
                            value={item.category_id || ''}
                            onChange={(e) => moveMedia(item, e.target.value)}
                          >
                            <option value="">Sem categoria</option>
                            {categories.map((c) => (
                              <option key={c.id} value={c.id}>
                                {c.name}
                              </option>
                            ))}
                          </select>
                        </label>
                        <div className="media-card__actions">
                          <button onClick={() => shiftOrder(item, -1)} title="Mover para cima">
                            ↑
                          </button>
                          <button onClick={() => shiftOrder(item, 1)} title="Mover para baixo">
                            ↓
                          </button>
                          <button onClick={() => editMedia(item)}>Editar</button>
                          <button className="danger" onClick={() => removeMedia(item)}>
                            Excluir
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
                {!filteredMedia.length && (
                  <p className="empty">Nenhuma mídia encontrada nesta galeria.</p>
                )}
              </section>
            )}
          </section>
        </section>
      )}

      {categoryModal && (
        <div
          className="modal"
          onClick={(e) => {
            if (e.target === e.currentTarget) setCategoryModal(false)
          }}
        >
          <form className="modal-card" onSubmit={saveCategory}>
            <div className="modal-card__heading">
              <div>
                <p className="eyebrow">Categoria</p>
                <h2>{categoryForm.id ? 'Editar categoria' : 'Nova categoria'}</h2>
              </div>
              <button type="button" onClick={() => setCategoryModal(false)}>
                ×
              </button>
            </div>
            <label>
              Nome
              <input
                value={categoryForm.name}
                onChange={(e) => syncSlug(e.target.value)}
                required
              />
            </label>
            <label>
              Slug
              <input
                value={categoryForm.slug}
                onChange={(e) => setCategoryForm({ ...categoryForm, slug: e.target.value })}
                required
              />
            </label>
            <label>
              Rota do site
              <input
                value={categoryForm.route_path}
                onChange={(e) => setCategoryForm({ ...categoryForm, route_path: e.target.value })}
                placeholder="/casamento"
              />
            </label>
            <label>
              Ordem
              <input
                value={categoryForm.sort_order}
                onChange={(e) =>
                  setCategoryForm({ ...categoryForm, sort_order: Number(e.target.value) })
                }
                type="number"
                min="0"
              />
            </label>
            <label className="check">
              <input
                type="checkbox"
                checked={categoryForm.is_active}
                onChange={(e) =>
                  setCategoryForm({ ...categoryForm, is_active: e.target.checked })
                }
              />{' '}
              Categoria ativa
            </label>
            <div className="modal-actions">
              <button
                type="button"
                className="secondary"
                onClick={() => setCategoryModal(false)}
              >
                Cancelar
              </button>
              <button className="primary" disabled={busy}>
                {busy ? 'Salvando...' : 'Salvar categoria'}
              </button>
            </div>
          </form>
        </div>
      )}

      {mediaModal && (
        <div
          className="modal"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeMediaModal()
          }}
        >
          <form className="modal-card modal-card--wide" onSubmit={saveMedia}>
            <div className="modal-card__heading">
              <div>
                <p className="eyebrow">Biblioteca</p>
                <h2>{mediaForm.id ? 'Editar mídia' : 'Adicionar mídia'}</h2>
              </div>
              <button type="button" onClick={closeMediaModal}>
                ×
              </button>
            </div>

            <div className="form-grid">
              <label>
                Título
                <input
                  value={mediaForm.title}
                  onChange={(e) => setMediaForm({ ...mediaForm, title: e.target.value })}
                  required
                />
              </label>
              <label>
                Categoria
                <select
                  value={mediaForm.category_id}
                  onChange={(e) => setMediaForm({ ...mediaForm, category_id: e.target.value })}
                >
                  <option value="">Sem categoria</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label>
              Legenda
              <textarea
                value={mediaForm.caption}
                onChange={(e) => setMediaForm({ ...mediaForm, caption: e.target.value })}
                rows={3}
                placeholder="Texto opcional exibido abaixo da mídia"
              />
            </label>
            <label>
              Texto alternativo
              <input
                value={mediaForm.alt_text}
                onChange={(e) => setMediaForm({ ...mediaForm, alt_text: e.target.value })}
                placeholder="Descrição da foto para acessibilidade e SEO"
              />
            </label>

            <div className="source-box">
              <div className="source-tabs">
                <button
                  type="button"
                  className={sourceMode === 'upload' ? 'active' : ''}
                  onClick={() => setSourceMode('upload')}
                >
                  Enviar arquivo
                </button>
                <button
                  type="button"
                  className={sourceMode === 'youtube' ? 'active' : ''}
                  onClick={() => setSourceMode('youtube')}
                >
                  YouTube
                </button>
                <button
                  type="button"
                  className={sourceMode === 'url' ? 'active' : ''}
                  onClick={() => setSourceMode('url')}
                >
                  URL externa
                </button>
              </div>

              {sourceMode === 'upload' ? (
                <label className="dropzone">
                  <input
                    type="file"
                    accept="image/*,video/mp4,video/webm,video/quicktime"
                    onChange={onFileChange}
                  />
                  <strong>{selectedFile ? selectedFile.name : 'Escolher foto ou vídeo'}</strong>
                  <span>Imagens e vídeos. Para fotos, prefira JPG ou WebP otimizados.</span>
                  {busy && uploadProgress > 0 && <span>Enviando {uploadProgress}%</span>}
                </label>
              ) : sourceMode === 'youtube' ? (
                <label>
                  Link ou ID do YouTube
                  <input
                    value={mediaForm.youtube_id}
                    onChange={(e) =>
                      setMediaForm({ ...mediaForm, youtube_id: e.target.value })
                    }
                    placeholder="https://youtube.com/watch?v=..."
                  />
                </label>
              ) : (
                <label>
                  URL da imagem ou vídeo
                  <input
                    value={mediaForm.image_url}
                    onChange={(e) => setMediaForm({ ...mediaForm, image_url: e.target.value })}
                    type="url"
                    placeholder="https://..."
                  />
                </label>
              )}
            </div>

            <div className="form-grid">
              <label>
                Ordem
                <input
                  value={mediaForm.sort_order}
                  onChange={(e) =>
                    setMediaForm({ ...mediaForm, sort_order: Number(e.target.value) })
                  }
                  type="number"
                  min="0"
                />
              </label>
              <div className="checks">
                <label className="check">
                  <input
                    type="checkbox"
                    checked={mediaForm.featured}
                    onChange={(e) =>
                      setMediaForm({ ...mediaForm, featured: e.target.checked })
                    }
                  />{' '}
                  Destaque na página inicial
                </label>
                <label className="check">
                  <input
                    type="checkbox"
                    checked={mediaForm.published}
                    onChange={(e) =>
                      setMediaForm({ ...mediaForm, published: e.target.checked })
                    }
                  />{' '}
                  Publicado no site
                </label>
              </div>
            </div>

            <div className="modal-actions">
              <button type="button" className="secondary" onClick={closeMediaModal}>
                Cancelar
              </button>
              <button className="primary" disabled={busy}>
                {busy ? 'Salvando...' : 'Salvar mídia'}
              </button>
            </div>
          </form>
        </div>
      )}
    </main>
  )
}

export default AdminPage
