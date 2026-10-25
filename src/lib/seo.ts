import { useEffect } from 'react'

const SITE_URL = 'https://vjproducoeseventos.com.br'
const BUSINESS_ID = `${SITE_URL}/#business`
const WEBSITE_ID = `${SITE_URL}/#website`
const DEFAULT_IMAGE = `${SITE_URL}/images/cerimonia.jpg`

interface SeoProps {
  title: string
  description: string
  path?: string
  serviceName?: string
}

export function usePageSeo({ title, description, path = '/', serviceName }: SeoProps) {
  useEffect(() => {
    const normalizedPath = path === '/' ? '/' : `/${path.replace(/^\/+|\/+$/g, '')}`
    const url = `${SITE_URL}${normalizedPath}`

    document.title = title

    // Set or create meta tags
    const setMeta = (nameOrProperty: 'name' | 'property', key: string, content: string) => {
      let meta = document.querySelector(`meta[${nameOrProperty}="${key}"]`) as HTMLMetaElement | null
      if (!meta) {
        meta = document.createElement('meta')
        meta.setAttribute(nameOrProperty, key)
        document.head.appendChild(meta)
      }
      meta.setAttribute('content', content)
    }

    setMeta('name', 'description', description)
    setMeta('name', 'robots', 'index,follow,max-image-preview:large')
    setMeta('property', 'og:locale', 'pt_BR')
    setMeta('property', 'og:type', 'website')
    setMeta('property', 'og:site_name', 'V J Produções e Eventos')
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:image', DEFAULT_IMAGE)
    setMeta('property', 'og:image:alt', 'V J Produções e Eventos em São José do Rio Preto - SP')
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', title)
    setMeta('name', 'twitter:description', description)
    setMeta('name', 'twitter:image', DEFAULT_IMAGE)

    // Set canonical link
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', url)

    // Schema graph
    const graph: any[] = [
      {
        '@type': ['LocalBusiness', 'ProfessionalService'],
        '@id': BUSINESS_ID,
        name: 'V J Produções e Eventos',
        url: SITE_URL,
        telephone: '+5517996438989',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'R. Dr. Carlos Rodrigues Nogueira, 1060 - Jardim Vivendas',
          addressLocality: 'São José do Rio Preto',
          addressRegion: 'SP',
          postalCode: '15090-415',
          addressCountry: 'BR',
        },
        areaServed: {
          '@type': 'City',
          name: 'São José do Rio Preto',
        },
        sameAs: ['https://www.instagram.com/vjproducoes.eventos/'],
      },
      {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        url: SITE_URL,
        name: 'V J Produções e Eventos',
        publisher: { '@id': BUSINESS_ID },
        inLanguage: 'pt-BR',
      },
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: title,
        description,
        isPartOf: { '@id': WEBSITE_ID },
        about: { '@id': BUSINESS_ID },
        inLanguage: 'pt-BR',
      },
    ]

    if (serviceName) {
      graph.push({
        '@type': 'Service',
        '@id': `${url}#service`,
        name: serviceName,
        description,
        url,
        provider: { '@id': BUSINESS_ID },
        areaServed: {
          '@type': 'City',
          name: 'São José do Rio Preto',
        },
      })
    }

    let scriptTag = document.querySelector('script#vj-schema-ld') as HTMLScriptElement | null
    if (!scriptTag) {
      scriptTag = document.createElement('script')
      scriptTag.id = 'vj-schema-ld'
      scriptTag.type = 'application/ld+json'
      document.head.appendChild(scriptTag)
    }
    scriptTag.textContent = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })
  }, [title, description, path, serviceName])
}
