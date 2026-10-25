import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { CollectionPage } from './pages/CollectionPage'
import { StudioPage } from './pages/StudioPage'
import { AdminPage } from './pages/AdminPage'
import { WhatsAppBubble } from './components/builder/WhatsAppBubble'

const categorySlugs = [
  'corporativo',
  'festas',
  'batizado',
  '15-anos',
  'casamento',
  'cerimonia',
  'aniversario',
  'decoracao-residencial',
  'especial-natal',
]

function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}

export const App: React.FC = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projetos" element={<CollectionPage />} />
        {categorySlugs.map((slug) => (
          <Route key={slug} path={`/${slug}`} element={<CollectionPage slug={slug} />} />
        ))}
        <Route path="/sobre-nos" element={<StudioPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/:slug" element={<CollectionPage />} />
      </Routes>
      <WhatsAppBubble />
    </>
  )
}

export default App
