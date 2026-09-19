<template>
  <div class="festas-page">
    <Header />

    <main>
      <section class="festas-hero" aria-labelledby="festas-title">
        <div class="festas-hero__overlay"></div>
        <div class="festas-hero__content">
          <p class="eyebrow">VJ Eventos</p>
          <h1 id="festas-title">Festas que ficam na memória</h1>
          <p class="festas-hero__intro">Cenários, experiências e celebrações pensados nos mínimos detalhes para transformar cada ocasião em uma história inesquecível.</p>
          <a class="festas-hero__link" href="#galeria">Conheça nossas produções</a>
        </div>
      </section>

      <section id="galeria" class="festas-content" aria-labelledby="galeria-title">
        <div class="festas-heading">
          <p class="eyebrow">Galeria de inspirações</p>
          <h2 id="galeria-title">Cada festa tem um jeito único de encantar</h2>
          <p>Do primeiro olhar à última lembrança, criamos ambientações completas para casamentos, aniversários, eventos corporativos e grandes celebrações.</p>
        </div>

        <div class="festas-gallery festas-gallery--featured">
          <figure class="gallery-card gallery-card--wide">
            <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-09-15%20at%2016.49.15-C5WWPFXQGKhOzsfspnFlslXwCN04Mx.jpeg" alt="Cenário de festa com arco floral, poltronas e iluminação quente" loading="eager" />
            <figcaption>Recepções sofisticadas</figcaption>
          </figure>
          <figure class="gallery-card">
            <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-09-15%20at%2016.51.18%20%281%29-sVEnoR5mPfISFXGeymCbb3OVRFf2Vq.jpeg" alt="Rancho da Comida com deck de madeira e palmeiras" loading="eager" />
            <figcaption>Experiências ao ar livre</figcaption>
          </figure>
          <figure class="gallery-card">
            <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-09-15%20at%2016.51.18%20%282%29-lc7setJQ1werpW6H4bM44jjr5SqZJy.jpeg" alt="Salão de evento com buffet, flores e mesas decoradas" loading="lazy" />
            <figcaption>Buffets e celebrações</figcaption>
          </figure>
        </div>

        <div class="festas-gallery festas-gallery--mosaic">
          <figure class="gallery-card gallery-card--tall">
            <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-09-15%20at%2016.51.18-HybgoBSPXplg905uIjt9MRs6NIGGTD.jpeg" alt="Pergolado iluminado com mesas em um jardim" loading="lazy" />
            <figcaption>Jardins iluminados</figcaption>
          </figure>
          <figure class="gallery-card gallery-card--tall">
            <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-09-15%20at%2016.51.24%20%281%29-GwVwlnHpYBAv0lMAFYiaVNI4zrsZ4S.jpeg" alt="Mesa posta em jardim com luzes e paisagem natural" loading="lazy" />
            <figcaption>Mesas ao pôr do sol</figcaption>
          </figure>
          <figure class="gallery-card">
            <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-09-15%20at%2016.51.24-u0sY9Mplw8Nqga6gbAzdUt1iNU59Bg.jpeg" alt="Recepção com arco de balões verdes e prateados" loading="lazy" />
            <figcaption>Detalhes personalizados</figcaption>
          </figure>
          <figure class="gallery-card">
            <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-09-15%20at%2016.51.14%20%281%29-PB1tMbNJ7G115BxBx7F4BPcekxYjJ0.jpeg" alt="Projeto de tenda com palco kids fazendinha e planta baixa" loading="lazy" />
            <figcaption>Projetos especiais</figcaption>
          </figure>
          <figure class="gallery-card gallery-card--wide">
            <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-09-15%20at%2016.51.14%20%283%29-ECxJesCy0iuhgWezPsxDzXKLSZSvJL.jpeg" alt="Tenda Expo Rio Preto com passarela de madeira e bandeiras do Brasil" loading="lazy" />
            <figcaption>Grandes estruturas</figcaption>
          </figure>
        </div>

        <div class="festas-video">
          <div>
            <p class="eyebrow">Em movimento</p>
            <h2>O ambiente ganha vida</h2>
            <p>Veja de perto a atmosfera de uma produção pensada para receber, surpreender e celebrar.</p>
          </div>
          <video controls playsinline preload="metadata" poster="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-09-15%20at%2016.51.24-u0sY9Mplw8Nqga6gbAzdUt1iNU59Bg.jpeg" aria-label="Vídeo de uma festa com decoração em balões verdes e prateados">
            <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Video%202026-09-15%20at%2016.51.17-ZVtDPuA7MuT8i9jod2dEkcxtQDpjC5.mp4" type="video/mp4" />
            Seu navegador não suporta a reprodução de vídeo.
          </video>
        </div>

        <div class="festas-gallery festas-gallery--details">
          <figure class="gallery-card">
            <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-09-15%20at%2010.47.44%20%281%29-vPUBlCziL9zsAlqsWu14ukiXXyC26R.jpeg" alt="Estande de evento com identidade visual e mesas" loading="lazy" />
            <figcaption>Experiências de marca</figcaption>
          </figure>
          <figure class="gallery-card">
            <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-09-15%20at%2010.47.42-0rk0rx3cUHxSQNzXEWjzFzFQASFwd2.jpeg" alt="Projeto de espaço kids fazendinha com palco e área infantil" loading="lazy" />
            <figcaption>Espaços para todas as idades</figcaption>
          </figure>
          <figure class="gallery-card">
            <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-09-15%20at%2010.54.11%20%283%29-qM2LTCJ74hRnr8OIme3fktcwlrJdqv.jpeg" alt="Sala de recepção com lounge branco e arranjos florais" loading="lazy" />
            <figcaption>Lounges acolhedores</figcaption>
          </figure>
          <figure class="gallery-card">
            <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-09-15%20at%2010.54.11-JbIKO5UReDvVUBCtC8x5xSs3Fy4iGY.jpeg" alt="Bolo de aniversário cercado por flores coloridas" loading="lazy" />
            <figcaption>Momentos celebrados</figcaption>
          </figure>
          <figure class="gallery-card">
            <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-09-15%20at%2010.54.12%20%283%29-Sm4MqYSoCpCBAuQ1zFnm2puryOySbo.jpeg" alt="Mesa de doces com flores brancas e lustres" loading="lazy" />
            <figcaption>Elegância nos detalhes</figcaption>
          </figure>
          <figure class="gallery-card">
            <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-09-15%20at%2010.54.14%20%281%29-VNf7vMxVc2fMwJLibMJ3QtjkqNDlUH.jpeg" alt="Mesa de evento decorada com flores rosas e doces" loading="lazy" />
            <figcaption>Produções autorais</figcaption>
          </figure>
          <figure class="gallery-card">
            <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-09-15%20at%2010.54.14%20%282%29-xPW1Pr0n9FT98dhQUEZ5pV9qaAYbRm.jpeg" alt="Salão com mesas postas e arranjos de limões" loading="lazy" />
            <figcaption>Composições naturais</figcaption>
          </figure>
          <figure class="gallery-card">
            <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-09-15%20at%2010.54.08%20%282%29-ZjJiNxanQ0XSN5ZpiDskUCEXkIhcBE.jpeg" alt="Lounge em tons quentes com flores e sofás" loading="lazy" />
            <figcaption>Atmosferas marcantes</figcaption>
          </figure>
          <figure class="gallery-card">
            <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-09-15%20at%2016.51.14%20%284%29-bUi0ZmSJkX30zfTkXVeCiUhaXmaoeE.jpeg" alt="Planta baixa de um espaço de eventos com área kids e deck" loading="lazy" />
            <figcaption>Planejamento de espaços</figcaption>
          </figure>
          <figure class="gallery-card">
            <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-09-15%20at%2016.51.14-x0d9dUD5JNuzOKMX3CP77tYd8deshV.jpeg" alt="Salão de eventos com mesas floridas e iluminação cênica" loading="lazy" />
            <figcaption>Ambientações completas</figcaption>
          </figure>
          <figure class="gallery-card">
            <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-09-15%20at%2016.51.15-lnrk8zcJYp3FcDvVDfhTzPIlpiHKlH.jpeg" alt="Festa com mesas cor-de-rosa, flores e cadeiras de madeira" loading="lazy" />
            <figcaption>Festas autorais</figcaption>
          </figure>
          <figure class="gallery-card gallery-card--wide">
            <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-09-15%20at%2010.54.26%20%283%29-c4hxNkeAMt6f8Lah3ElU9bLyxfuAjO.jpeg" alt="Cerimônia com passarela branca, cortinas e convidados" loading="lazy" />
            <figcaption>Cerimônias inesquecíveis</figcaption>
          </figure>
          <figure class="gallery-card">
            <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-09-15%20at%2010.54.27%20%282%29-bR3TOLD1hjaeTqjfWlnXWIEpQC0Ixe.jpeg" alt="Salão de festa com lustres, mesas e decoração em vermelho" loading="lazy" />
            <figcaption>Salões celebrados</figcaption>
          </figure>
          <figure class="gallery-card">
            <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-09-15%20at%2010.54.27%20%284%29-2IUYYnzMpGinSlUpzWb2Ou8dc7Kqzi.jpeg" alt="Bolo de vários andares em mesa decorada com doces" loading="lazy" />
            <figcaption>Mesas de doces</figcaption>
          </figure>
          <figure class="gallery-card gallery-card--wide">
            <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-09-15%20at%2010.54.22-wKwWSeI9DWrMHQkmrF2oHBxheNWpAw.jpeg" alt="Mesa de doces com painéis listrados e arranjos florais" loading="lazy" />
            <figcaption>Detalhes que encantam</figcaption>
          </figure>
          <figure class="gallery-card">
            <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-09-15%20at%2010.54.24%20%281%29-SOOjWy6fYhYwGiNluBqh4ocOqSyDfD.jpeg" alt="Mesa de doces com decoração clássica e flores" loading="lazy" />
            <figcaption>Confeitaria especial</figcaption>
          </figure>
          <figure class="gallery-card">
            <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-09-15%20at%2010.54.24%20%282%29-tHNngmpTW445BgTKyDlCoy3eUkJcGt.jpeg" alt="Ambiente de festa com bolo branco, folhagens e flores claras" loading="lazy" />
            <figcaption>Elegância natural</figcaption>
          </figure>
          <figure class="gallery-card">
            <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-09-15%20at%2010.54.10-qYaP2ZqNTELT5bJPHLHbEy5Bahuaoi.jpeg" alt="Corredor de evento com arranjos florais sob iluminação azul" loading="lazy" />
            <figcaption>Iluminação cênica</figcaption>
          </figure>
          <figure class="gallery-card">
            <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-09-15%20at%2010.54.26-rIQhb42zb7nsIeRcWSTTVJVHXas3t0.jpeg" alt="Salão de jantar com mesas e flores sob luz azul e roxa" loading="lazy" />
            <figcaption>Atmosferas noturnas</figcaption>
          </figure>
          <figure class="gallery-card gallery-card--wide">
            <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-09-15%20at%2010.54.27%20%281%29-N1aHbrVrahZThwehL5lgYrQgvo8FYS.jpeg" alt="Mesa de doces com flores coloridas, velas e cristais" loading="lazy" />
            <figcaption>Composições florais</figcaption>
          </figure>
          <figure class="gallery-card">
            <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-09-15%20at%2010.54.28%20%281%29-2LME3IHh60bEN5XJLhb4kQlg7RYq93.jpeg" alt="Lounge com sofás brancos e arranjos florais amarelos" loading="lazy" />
            <figcaption>Lounges personalizados</figcaption>
          </figure>
          <figure class="gallery-card">
            <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-09-15%20at%2010.54.23-GRlVeNcGmUbBT3TFDI0G4nKncDFysb.jpeg" alt="Mesa de doces com flores rosas e folhagens sob luz quente" loading="lazy" />
            <figcaption>Festas com identidade</figcaption>
          </figure>
        </div>

        <div class="festas-video festas-video--collection">
          <div>
            <p class="eyebrow">Mais produções</p>
            <h2>Veja cada detalhe em movimento</h2>
            <p>Uma seleção de registros para sentir a atmosfera, a montagem e a energia das nossas celebrações.</p>
          </div>
          <div class="festas-video__grid">
            <video controls playsinline preload="metadata" aria-label="Vídeo de montagem de festa com flores e iluminação"><source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Video%202026-09-15%20at%2011.08.46%20%281%29-kX39WIA7rHSUZ6FA5D15XVd0FnDw50.mp4" type="video/mp4" /></video>
            <video controls playsinline preload="metadata" aria-label="Vídeo de ambientação de evento"><source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Video%202026-09-15%20at%2011.08.45%20%283%29-gsjLL9lEih8TQY9AOTUViydrEUf2cb.mp4" type="video/mp4" /></video>
            <video controls playsinline preload="metadata" aria-label="Vídeo de decoração de festa"><source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Video%202026-09-15%20at%2011.08.45%20%282%29-QBtUbzLqG4huERGug44KlSTaTtuuUx.mp4" type="video/mp4" /></video>
            <video controls playsinline preload="metadata" aria-label="Vídeo de evento decorado"><source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Video%202026-09-15%20at%2011.08.45-CgrnhoMX5TKS956w5bvs7b9ugf0rSR.mp4" type="video/mp4" /></video>
          </div>
        </div>
      </section>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { useHead } from '@unhead/vue'
import Header from '@/pages/shared/Header.vue'
import Footer from '@/pages/shared/Footer.vue'

useHead({
  htmlAttrs: { lang: 'pt-BR' },
  title: 'Festas | VJ Eventos',
  meta: [{ name: 'description', content: 'Conheça nossas produções para festas, celebrações e eventos especiais.' }],
})
</script>

<style scoped>
.festas-page {
  --festas-green: #01240e;
  --festas-deep: #0a120c;
  --festas-gold: #c4a44a;
  --festas-cream: #f2ede5;
  background: var(--festas-green);
  color: var(--festas-cream);
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
}

.festas-hero {
  min-height: min(78vh, 760px);
  display: flex;
  align-items: center;
  position: relative;
  isolation: isolate;
  background: url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-09-15%20at%2016.49.15-C5WWPFXQGKhOzsfspnFlslXwCN04Mx.jpeg') center / cover;
}

.festas-hero__overlay { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(1, 36, 14, .2), rgba(1, 18, 8, .9)); z-index: -1; }
.festas-hero__content { width: min(1224px, calc(100% - 32px)); margin: 0 auto; padding: 140px 0 84px; }
.eyebrow { color: var(--festas-gold); font-size: 12px; letter-spacing: .18em; text-transform: uppercase; font-weight: 600; margin-bottom: 16px; }
.festas-hero h1, .festas-heading h2, .festas-video h2 { font-family: 'Cormorant Garamond', Georgia, serif; font-weight: 400; line-height: 1.02; }
.festas-hero h1 { max-width: 680px; font-size: clamp(48px, 7vw, 96px); font-style: italic; }
.festas-hero__intro { max-width: 520px; margin-top: 24px; color: #d8d0c4; line-height: 1.7; font-size: 16px; }
.festas-hero__link { display: inline-block; margin-top: 28px; color: var(--festas-cream); border-bottom: 1px solid var(--festas-gold); padding-bottom: 8px; text-decoration: none; font-size: 13px; letter-spacing: .06em; }
.festas-content { width: min(1224px, calc(100% - 32px)); margin: 0 auto; padding: 104px 0 120px; }
.festas-heading { max-width: 720px; margin-bottom: 56px; }
.festas-heading h2, .festas-video h2 { font-size: clamp(38px, 5vw, 64px); }
.festas-heading > p:last-child, .festas-video p:last-child { color: #b4a288; line-height: 1.8; margin-top: 20px; max-width: 620px; }
.festas-gallery { display: grid; gap: 20px; margin-bottom: 20px; }
.festas-gallery--featured { grid-template-columns: 1.6fr 1fr 1fr; }
.festas-gallery--mosaic { grid-template-columns: 1fr 1fr 1.2fr; }
.festas-gallery--details { grid-template-columns: repeat(4, 1fr); margin-top: 20px; }
.gallery-card { position: relative; overflow: hidden; min-height: 280px; background: #102117; margin: 0; }
.gallery-card--wide { grid-column: span 2; }
.gallery-card--tall { min-height: 520px; }
.gallery-card img { display: block; width: 100%; height: 100%; min-height: inherit; object-fit: cover; transition: transform .6s ease; }
.gallery-card:hover img { transform: scale(1.04); }
.gallery-card::after { content: ''; position: absolute; inset: 45% 0 0; background: linear-gradient(transparent, rgba(1, 18, 8, .78)); pointer-events: none; }
.gallery-card figcaption { position: absolute; z-index: 1; left: 20px; bottom: 18px; color: var(--festas-cream); font-family: 'Cormorant Garamond', Georgia, serif; font-size: 24px; }
.festas-video { display: grid; grid-template-columns: .8fr 1.4fr; gap: 48px; align-items: center; padding: 100px 0; }
.festas-video video { width: 100%; max-height: 620px; object-fit: cover; background: #000; }
.festas-video--collection { display: block; padding-top: 72px; }
.festas-video__grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-top: 32px; }
.festas-video__grid video { aspect-ratio: 9 / 14; max-height: none; object-fit: cover; }

@media (max-width: 920px) {
  .festas-hero { min-height: 680px; }
  .festas-hero__content { padding-bottom: 56px; }
  .festas-gallery--featured, .festas-gallery--mosaic { grid-template-columns: 1fr 1fr; }
  .festas-gallery--featured .gallery-card--wide, .festas-gallery--mosaic .gallery-card--wide { grid-column: span 2; }
  .festas-gallery--details { grid-template-columns: 1fr 1fr; }
  .festas-video { grid-template-columns: 1fr; gap: 32px; padding: 72px 0; }
  .festas-video__grid { grid-template-columns: 1fr 1fr; }
}

@media (max-width: 560px) {
  .festas-content { padding: 72px 0 80px; }
  .festas-gallery--featured, .festas-gallery--mosaic, .festas-gallery--details { grid-template-columns: 1fr; gap: 14px; }
  .festas-gallery--featured .gallery-card--wide, .festas-gallery--mosaic .gallery-card--wide { grid-column: auto; }
  .gallery-card, .gallery-card--tall { min-height: 300px; }
  .festas-gallery--featured .gallery-card:first-child { min-height: 420px; }
  .festas-hero__intro { font-size: 14px; }
  .gallery-card figcaption { font-size: 22px; }
  .festas-video__grid { grid-template-columns: 1fr; }
}
</style>

<style>
.festas-page .block-navigation { z-index: 10; }
</style>
