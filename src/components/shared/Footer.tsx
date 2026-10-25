import React from 'react'
import { Link } from 'react-router-dom'
import { contactUrl, instagramUrl } from '@/data/portfolio.js'

export const Footer: React.FC = () => {
  return (
    <>
      <section id="contato" className="contact-section" aria-labelledby="contact-title">
        <div className="contact-top">
          <span className="eyebrow">O próximo cenário pode ser o seu</span>
          <span className="contact-star" aria-hidden="true">
            ✳
          </span>
        </div>
        <div className="contact-main">
          <h2 id="contact-title">
            Vamos dar forma
            <br />
            ao seu <em>próximo momento?</em>
          </h2>
          <a
            className="circle-link"
            href={contactUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Conversar sobre meu evento no WhatsApp"
          >
            <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="contact-bottom">
          <p>Conte a sua ideia. A gente começa a criar a partir dela.</p>
          <a className="text-link" href={contactUrl} target="_blank" rel="noopener noreferrer">
            Conversar pelo WhatsApp <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
      <footer className="site-footer">
        <div className="footer-top">
          <Link to="/" className="footer-brand">
            <img src="/images/logo-vj.webp" alt="V J Produções e Eventos" width="170" height="113" />
          </Link>
          <p>
            Decoração, ambientação
            <br />e histórias para celebrar.
          </p>
          <div>
            <span className="eyebrow">Encontre a V J Produções e Eventos</span>
            <address>
              R. Dr. Carlos Rodrigues Nogueira, 1060
              <br />
              Jardim Vivendas · São José do Rio Preto, SP
            </address>
            <a href="https://maps.app.goo.gl/62nBeAepMWUV8Bti8" target="_blank" rel="noopener noreferrer">
              Como chegar ↗
            </a>
          </div>
          <div className="footer-social">
            <a href={instagramUrl} target="_blank" rel="noopener noreferrer">
              Instagram ↗
            </a>
            <a href="tel:+5517996438989">(17) 99643-8989 ↗</a>
            <Link to="/projetos">Conheça os projetos ↗</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} V J Produções e Eventos.</span>
          <span>São José do Rio Preto · SP</span>
          <a href="#top" onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}>
            Voltar ao topo ↑
          </a>
        </div>
      </footer>
    </>
  )
}

export default Footer
