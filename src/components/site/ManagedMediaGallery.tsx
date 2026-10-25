import React, { useState, useEffect } from 'react'
import { getLocalMedia, getLocalCategories, MediaItem } from '@/lib/cms-store'

interface ManagedMediaGalleryProps {
  categorySlug?: string
  featured?: boolean
  title?: string
}

export const ManagedMediaGallery: React.FC<ManagedMediaGalleryProps> = ({
  categorySlug = '',
  featured = false,
  title = '',
}) => {
  const [items, setItems] = useState<MediaItem[]>([])
  const [categoryName, setCategoryName] = useState<string>('')
  const [activeImage, setActiveImage] = useState<MediaItem | null>(null)

  useEffect(() => {
    let isMounted = true

    async function loadMedia() {
      try {
        const query = featured
          ? '/api/content?featured=1'
          : categorySlug
          ? `/api/content?category=${encodeURIComponent(categorySlug)}`
          : ''

        if (!query) {
          if (isMounted) setItems([])
          return
        }

        const response = await fetch(query)
        if (response.ok) {
          const data = await response.json()
          if (isMounted && data.items && data.items.length > 0) {
            setItems(data.items)
            setCategoryName(data.category?.name || '')
            return
          }
        }
      } catch {
        // Fallback to local storage store
      }

      // Local fallback logic
      const allCategories = getLocalCategories()
      const allMedia = getLocalMedia()

      if (featured) {
        const feat = allMedia.filter((m) => m.featured && m.published !== false)
        if (isMounted) {
          setItems(feat)
          setCategoryName('Destaques')
        }
      } else if (categorySlug) {
        const cat = allCategories.find((c) => c.slug === categorySlug)
        const catItems = allMedia.filter(
          (m) => (cat ? m.category_id === cat.id : false) && m.published !== false
        )
        if (isMounted) {
          setItems(catItems)
          setCategoryName(cat ? cat.name : '')
        }
      }
    }

    loadMedia()

    return () => {
      isMounted = false
    }
  }, [categorySlug, featured])

  useEffect(() => {
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  const sectionTitle = title || (featured ? 'Destaques' : categoryName || 'Galeria')

  const mediaType = (item: MediaItem) => {
    if (item.media_type) return item.media_type
    if (item.youtube_id) return 'youtube'
    if (item.image_url && /\.(mp4|webm|mov)(\?|$)/i.test(item.image_url)) return 'video'
    return 'image'
  }

  const youtubeEmbed = (id?: string | null) => {
    return `https://www.youtube.com/embed/${id}?controls=1&rel=0&modestbranding=1&playsinline=1`
  }

  const openLightbox = (item: MediaItem) => {
    setActiveImage(item)
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    setActiveImage(null)
    document.body.style.overflow = ''
  }

  if (!items.length) return null

  return (
    <section className="managed-gallery" aria-label={sectionTitle}>
      <div className="managed-gallery__inner">
        <header className="managed-gallery__header">
          <div>
            <p className="managed-gallery__eyebrow">{featured ? 'Seleção' : 'Galeria'}</p>
            <h2>{sectionTitle}</h2>
          </div>
          <p className="managed-gallery__count">
            {items.length} {items.length === 1 ? 'item' : 'itens'}
          </p>
        </header>

        <div className="managed-gallery__grid">
          {items.map((item) => {
            const type = mediaType(item)
            return (
              <article
                key={item.id}
                className={`managed-card ${item.featured ? 'managed-card--featured' : ''}`}
              >
                {type === 'image' ? (
                  <button
                    type="button"
                    className="managed-card__media managed-card__media--button"
                    onClick={() => openLightbox(item)}
                  >
                    <img
                      src={item.image_url || item.display_url || ''}
                      alt={item.alt_text || item.title || sectionTitle}
                      loading="lazy"
                    />
                    <span className="managed-card__zoom" aria-hidden="true">
                      ＋
                    </span>
                  </button>
                ) : type === 'youtube' ? (
                  <div className="managed-card__media managed-card__video">
                    <iframe
                      src={youtubeEmbed(item.youtube_id)}
                      title={item.title || 'Vídeo'}
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <div className="managed-card__media managed-card__video">
                    <video src={item.image_url || ''} controls preload="metadata" playsInline />
                  </div>
                )}

                {(item.title || item.caption) && (
                  <div className="managed-card__caption">
                    {item.title && <strong>{item.title}</strong>}
                    {item.caption && <p>{item.caption}</p>}
                  </div>
                )}
              </article>
            )
          })}
        </div>
      </div>

      {activeImage && (
        <div
          className="managed-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={'Imagem ampliada: ' + (activeImage.alt_text || activeImage.title || '')}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeLightbox()
          }}
          onKeyDown={(e) => {
            if (e.key === 'Escape') closeLightbox()
          }}
          tabIndex={-1}
        >
          <button type="button" className="managed-lightbox__close" aria-label="Fechar" onClick={closeLightbox}>
            ×
          </button>
          <figure>
            <img
              src={activeImage.image_url || activeImage.display_url || ''}
              alt={activeImage.alt_text || activeImage.title || sectionTitle}
            />
            {(activeImage.title || activeImage.caption) && (
              <figcaption>
                {activeImage.title && <strong>{activeImage.title}</strong>}
                {activeImage.caption && <span>{activeImage.caption}</span>}
              </figcaption>
            )}
          </figure>
        </div>
      )}
    </section>
  )
}

export default ManagedMediaGallery
