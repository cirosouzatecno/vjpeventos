import React from 'react'
import { Header } from '@/components/shared/Header'
import { Footer } from '@/components/shared/Footer'
import { usePageSeo } from '@/lib/seo'
import { process, contactUrl } from '@/data/portfolio.js'

export const StudioPage: React.FC = () => {
  usePageSeo({
    title: 'A nossa essência | V J Produções e Eventos',
    description:
      'Conheça a V J Produções e Eventos. Um olhar sensível para decoração, ambientação e projetos especiais em São José do Rio Preto.',
    path: '/sobre-nos',
  })

  return (
    <div id="top" className="vj-site">
      <Header />
      <main id="main">
        <section className="page-intro section-wrap">
          <p className="eyebrow">A essência V J Produções e Eventos</p>
          <h1>
            O olhar que transforma.
            <br />
            <em>O cuidado que encanta.</em>
          </h1>
          <p>
            Acreditamos no poder dos encontros.
            <br />
            E na beleza de criar o cenário para que eles aconteçam.
          </p>
        </section>

        <section className="studio-section section-wrap">
          <img
            src="/images/cerimonia.jpg"
            alt="Composição V J Produções e Eventos de flores brancas, vidro e uma passarela verde para cerimônia"
          />
          <div>
            <p className="eyebrow">V J Produções e Eventos</p>
            <h2>
              Intenção em cada escolha.
              <br />
              <em>Emoção em cada detalhe.</em>
            </h2>
            <p>
              Em São José do Rio Preto, a VJ desenvolve projetos de decoração e ambientação para
              celebrações sociais, eventos corporativos e espaços especiais.
            </p>
            <p>
              Nosso ponto de partida é a sua história. A partir dela, conectamos flores, cores, luz e
              materiais para compor ambientes que fazem sentido para cada ocasião.
            </p>
            <a
              className="text-link"
              href={contactUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Vamos conversar sobre sua ideia <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>

        <section className="process-section section-wrap">
          <p className="eyebrow">Como criamos</p>
          <h2>
            Da ideia à <em>memória.</em>
          </h2>
          <div className="process-grid">
            {process.map((step, index) => (
              <article key={step.title}>
                <span className="process-number">0{index + 1}</span>
                <h3>{step.title}.</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default StudioPage
