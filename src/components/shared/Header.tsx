import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { categories, contactUrl } from '@/data/portfolio.js'

export const Header: React.FC = () => {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)

  useEffect(() => {
    setMenuOpen(false)
    setServicesOpen(false)
  }, [location.pathname, location.hash])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setMenuOpen(false)
      setServicesOpen(false)
    }
  }

  const isCurrent = (path: string, exact = false) => {
    if (exact) {
      return location.pathname === path
    }
    return location.pathname.startsWith(path)
  }

  return (
    <>
      <a className="skip-link" href="#main">
        Pular para o conteúdo
      </a>
      <header className="site-header" onKeyDown={handleKeyDown}>
        <Link className="brand" to="/" aria-label="V J Produções e Eventos — início">
          <img src="/images/logo-vj.webp" alt="V J Produções e Eventos" width="150" height="100" />
        </Link>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? 'Fechar' : 'Menu'} <span aria-hidden="true">{menuOpen ? '×' : '☰'}</span>
        </button>
        <nav
          id="main-navigation"
          className={`main-navigation ${menuOpen ? 'is-open' : ''}`}
          aria-label="Navegação principal"
        >
          <Link to="/" className={isCurrent('/', true) ? 'is-current' : ''}>
            Início
          </Link>
          <Link to="/projetos" className={isCurrent('/projetos') ? 'is-current' : ''}>
            Portfólio
          </Link>
          <div
            className="services-menu"
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node)) {
                setServicesOpen(false)
              }
            }}
          >
            <button
              type="button"
              aria-expanded={servicesOpen}
              aria-controls="services-navigation"
              onClick={() => setServicesOpen(!servicesOpen)}
            >
              O que fazemos <span aria-hidden="true">⌄</span>
            </button>
            {servicesOpen && (
              <div id="services-navigation" className="services-dropdown">
                {categories.map((category) => (
                  <Link
                    key={category.slug}
                    to={'/' + category.slug}
                    onClick={() => {
                      setServicesOpen(false)
                      setMenuOpen(false)
                    }}
                  >
                    {category.name} <span aria-hidden="true">↗</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link to="/sobre-nos" className={isCurrent('/sobre-nos') ? 'is-current' : ''}>
            V J Produções e Eventos
          </Link>
          <a
            href="/#contato"
            onClick={(e) => {
              setMenuOpen(false)
              if (location.pathname === '/') {
                e.preventDefault()
                document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })
              }
            }}
          >
            Contato
          </a>
          <a
            className="header-contact"
            href={contactUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Vamos criar juntos <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </header>
    </>
  )
}

export default Header
