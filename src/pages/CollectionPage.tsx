import React, { useState, useRef, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Header } from '@/components/shared/Header'
import { Footer } from '@/components/shared/Footer'
import { FilmGallery } from '@/components/site/FilmGallery'
import { ManagedMediaGallery } from '@/components/site/ManagedMediaGallery'
import { usePageSeo } from '@/lib/seo'
import { categories, contactUrl } from '@/data/portfolio.js'

interface NatalImageItem {
  id: string
  src: string
}

const natalImageModules = import.meta.glob('../assets/natal/*.jpg', { eager: true, import: 'default' })
const natalImages: NatalImageItem[] = Object.entries(natalImageModules).map(([path, src]) => ({
  src: src as string,
  id: path,
}))

interface CollectionPageProps {
  slug?: string
}

export const CollectionPage: React.FC<CollectionPageProps> = ({ slug: propSlug }) => {
  const params = useParams<{ slug?: string }>()
  const slug = propSlug || params.slug || ''

  const category = categories.find((item) => item.slug === slug)
  const [filter, setFilter] = useState('todos')
  const [activeImage, setActiveImage] = useState<NatalImageItem | null>(null)
  const imageDialogRef = useRef<HTMLDialogElement>(null)

  const filters = [
    { id: 'todos', name: 'Todos os projetos' },
    { id: 'social', name: 'Celebrações sociais' },
    { id: 'corporativo', name: 'Corporativo' },
    { id: 'ambientes', name: 'Ambientes especiais' },
  ]

  const filtered = categories.filter(
    (item) => filter === 'todos' || item.group === filter
  )

  const openImage = (item: NatalImageItem) => {
    setActiveImage(item)
    document.body.style.overflow = 'hidden'
    if (imageDialogRef.current && !imageDialogRef.current.open) {
      imageDialogRef.current.showModal()
    }
  }

  const closeImage = () => {
    if (imageDialogRef.current?.open) {
      imageDialogRef.current.close()
    }
    setActiveImage(null)
    document.body.style.overflow = ''
  }

  useEffect(() => {
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  usePageSeo({
    title: `${category?.name || 'Portfólio'} | V J Produções e Eventos`,
    description:
      category?.description ||
      'Conheça os projetos de decoração, cenografia e ambientação da V J Produções e Eventos em São José do Rio Preto.',
    path: '/' + (slug || 'projetos'),
    serviceName: category?.name || 'Projetos de decoração e ambientação',
  })

  return (
    <div id="top" className="vj-site">
      <Header />
      <main id="main">
        {category ? (
          <>
            <section className="collection-hero section-wrap">
              <div>
                <Link className="eyebrow breadcrumb" to="/projetos">
                  ← Voltar ao portfólio
                </Link>
                <h1>
                  {category.name}
                  <em>.</em>
                </h1>
                <p className="collection-line">{category.line}</p>
                <p className="collection-description">{category.description}</p>
                <a
                  className="button button-gold"
                  href={contactUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Vamos criar seu projeto <span aria-hidden="true">↗</span>
                </a>
              </div>
              <div className="collection-cover">
                <img
                  src={category.image}
                  alt={`Projeto de ${category.name} da VJ`}
                  fetchPriority="high"
                />
              </div>
            </section>

            <FilmGallery videos={category.videos} localVideos={category.localVideos} />

            {slug === 'especial-natal' && (
              <section className="section-wrap natal-collection">
                <div className="section-heading">
                  <div>
                    <p className="eyebrow">Luz, afeto e celebração</p>
                    <h2>
                      O Natal em <em>detalhes.</em>
                    </h2>
                  </div>
                  <p>Toque em uma imagem para ampliar.</p>
                </div>
                <div className="natal-grid">
                  {natalImages.map((item, index) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => openImage(item)}
                      aria-label={`Ampliar decoração natalina ${index + 1}`}
                    >
                      <img
                        src={item.src}
                        alt={`Composição natalina VJ ${index + 1}`}
                        loading="lazy"
                      />
                      <span aria-hidden="true">+</span>
                    </button>
                  ))}
                </div>
                <dialog
                  ref={imageDialogRef}
                  className="media-dialog photo-dialog"
                  aria-label="Decoração natalina ampliada"
                  onCancel={(e) => {
                    e.preventDefault()
                    closeImage()
                  }}
                  onClick={(event) => {
                    if (event.target === imageDialogRef.current) closeImage()
                  }}
                >
                  <button
                    className="dialog-close"
                    type="button"
                    onClick={closeImage}
                    aria-label="Fechar imagem"
                  >
                    ×
                  </button>
                  {activeImage && (
                    <img src={activeImage.src} alt="Detalhes da decoração natalina VJ" />
                  )}
                </dialog>
              </section>
            )}

            <ManagedMediaGallery categorySlug={slug} />

            <section className="related-section section-wrap">
              <p className="eyebrow">Continue se inspirando</p>
              <h2>
                Outras formas de <em>celebrar.</em>
              </h2>
              <div className="related-links">
                {categories
                  .filter((item) => item.slug !== slug)
                  .slice(0, 3)
                  .map((item) => (
                    <Link key={item.slug} to={'/' + item.slug}>
                      {item.name} <span aria-hidden="true">↗</span>
                    </Link>
                  ))}
              </div>
            </section>
          </>
        ) : (
          <>
            <section className="page-intro section-wrap">
              <p className="eyebrow">O universo V J Produções e Eventos</p>
              <h1>
                O seu próximo
                <br />
                <em>encantamento.</em>
              </h1>
              <p>
                Explore as possibilidades. Cada ocasião, um olhar.
                <br />
                Cada projeto, uma história que merece ser contada.
              </p>
            </section>

            <section className="all-projects section-wrap" aria-label="Portfólio de projetos">
              <div className="portfolio-filters" role="group" aria-label="Filtrar projetos">
                {filters.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={filter === item.id}
                    onClick={() => setFilter(item.id)}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
              <p className="sr-only" aria-live="polite">
                {filtered.length} categorias de projetos
              </p>
              <div className="portfolio-grid">
                {filtered.map((item, index) => (
                  <Link key={item.slug} to={'/' + item.slug} className="project-card">
                    <div className="project-image">
                      <img src={item.image} alt={`Decoração VJ — ${item.name}`} loading="lazy" />
                      <span className="project-arrow" aria-hidden="true">
                        ↗
                      </span>
                    </div>
                    <div className="project-caption">
                      <h2>{item.name}</h2>
                      <span>{String(index + 1).padStart(2, '0')}</span>
                    </div>
                    <p>{item.line}</p>
                  </Link>
                ))}
              </div>
            </section>

            <FilmGallery
              videos={[
                'b8X-PMvKYC0',
                'iPRwcfobVs0',
                'XQQoSAPjvS0',
                'O1sKoeN-4mM',
                'ENxamFIJknY',
                'm7OETuDX684',
                'jol6xQvyitk',
              ]}
              title="Outros olhares sobre a V J Produções e Eventos"
            />
            <ManagedMediaGallery categorySlug="projetos" />
          </>
        )}
      </main>
      <Footer />
    </div>
  )
}

export default CollectionPage
