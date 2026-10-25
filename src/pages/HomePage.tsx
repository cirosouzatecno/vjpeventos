import React from 'react'
import { Link } from 'react-router-dom'
import { Header } from '@/components/shared/Header'
import { Footer } from '@/components/shared/Footer'
import { usePageSeo } from '@/lib/seo'
import { categories, contactUrl, process } from '@/data/portfolio.js'
import { ManagedMediaGallery } from '@/components/site/ManagedMediaGallery'
import { HomeVideoShowcase } from '@/components/site/HomeVideoShowcase'

export const HomePage: React.FC = () => {
  const featured = [categories[0], categories[3], categories[1]]

  usePageSeo({
    title: 'V J Produções e Eventos | Cenários para celebrar',
    description:
      'Decoração e ambientação de casamentos, festas, eventos corporativos e projetos especiais em São José do Rio Preto. Conheça o universo V J Produções e Eventos.',
    path: '/',
    serviceName: 'Decoração e ambientação de eventos',
  })

  return (
    <div id="top" className="vj-site">
      <Header />
      <main id="main">
        <HomeVideoShowcase />
        <section className="portfolio-section section-wrap" aria-labelledby="portfolio-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Um olhar sobre o nosso trabalho</p>
              <h2 id="portfolio-title">
                Histórias em <em>cenários.</em>
              </h2>
            </div>
            <Link className="text-link" to="/projetos">
              Todos os projetos <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <div className="featured-grid">
            {featured.map((item, index) => (
              <Link
                key={item.slug}
                to={'/' + item.slug}
                className={`project-card ${index === 1 ? 'project-card-offset' : ''}`}
              >
                <div className="project-image">
                  <img src={item.image} alt={`Decoração VJ — ${item.name}`} loading="lazy" />
                  <span className="project-arrow" aria-hidden="true">
                    ↗
                  </span>
                </div>
                <div className="project-caption">
                  <h3>{item.name}</h3>
                  <span>0{index + 1}</span>
                </div>
                <p>{item.line}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="services-section section-wrap" aria-labelledby="services-title">
          <div className="services-intro">
            <p className="eyebrow">Diferentes ocasiões. A mesma dedicação.</p>
            <h2 id="services-title">
              Para cada ocasião,
              <br />
              um novo <em>encanto.</em>
            </h2>
            <p>
              Do encontro mais íntimo à grande celebração, criamos ambientes com identidade e
              significado.
            </p>
          </div>
          <div className="services-list">
            {categories.map((item, index) => (
              <Link key={item.slug} to={'/' + item.slug}>
                <span className="service-number">{String(index + 1).padStart(2, '0')}</span>
                <span>{item.name}</span>
                <span aria-hidden="true">↗</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="image-statement">
          <img
            src="/images/hero.jpg"
            alt="Ambientação floral VJ em uma igreja com arquitetura clássica"
            loading="lazy"
          />
          <div>
            <p className="eyebrow">Um olhar sensível. Uma criação singular.</p>
            <h2>
              A beleza passa.
              <br />
              <em>A emoção permanece.</em>
            </h2>
            <a
              className="button button-light"
              href={contactUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Imagine seu evento com a V J Produções e Eventos <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>

        <section className="process-section section-wrap">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Do primeiro encontro ao grande dia</p>
              <h2>
                O cuidado faz <em>parte.</em>
              </h2>
            </div>
            <p>
              Um caminho pensado
              <br />
              para construir o seu momento.
            </p>
          </div>
          <div className="process-grid">
            {process.map((step, index) => (
              <article key={step.title}>
                <span className="process-number">
                  0{index + 1} <span aria-hidden="true">—</span>
                </span>
                <h3>
                  {step.title}
                  <span aria-hidden="true">.</span>
                </h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </section>

        <ManagedMediaGallery featured={true} title="Mais histórias, novos olhares" />
      </main>
      <Footer />
    </div>
  )
}

export default HomePage
