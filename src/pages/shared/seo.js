import { useHead } from '@unhead/vue'

const SITE_URL = 'https://vjproducoeseventos.com.br'
const BUSINESS_ID = `${SITE_URL}/#business`
const WEBSITE_ID = `${SITE_URL}/#website`
const DEFAULT_IMAGE = 'https://horizons-cdn.hostinger.com/9ff0c242-ec08-4248-b694-3de2ee09bf42/img-20260605-wa0001-E2V4bcFE1sMqHZLZ.jpg?width=1200&fit=crop'

export function usePageSeo({ title, description, path = '/', serviceName }) {
  const normalizedPath = path === '/' ? '/' : `/${path.replace(/^\/+|\/+$/g, '')}`
  const url = `${SITE_URL}${normalizedPath}`
  const graph = [
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

  useHead({
    htmlAttrs: { lang: 'pt-BR' },
    title,
    link: [{ rel: 'canonical', href: url }],
    meta: [
      { name: 'description', content: description },
      { name: 'robots', content: 'index,follow,max-image-preview:large' },
      { property: 'og:locale', content: 'pt_BR' },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'V J Produções e Eventos' },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:url', content: url },
      { property: 'og:image', content: DEFAULT_IMAGE },
      { property: 'og:image:alt', content: 'V J Produções e Eventos em São José do Rio Preto - SP' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: DEFAULT_IMAGE },
    ],
    script: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }),
      },
    ],
  })
}
