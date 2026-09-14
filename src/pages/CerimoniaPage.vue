<template>
  <Page pageId="cerimonia" locale="system" :cssVars="cssVars" :pageStyle="cssVars"
    googleFontsHref="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap">
    <Header :isTransparent="false" />
    <main class="cerimonia-page">
      <section class="cerimonia-hero" aria-labelledby="cerimonia-title">
        <div class="cerimonia-hero__content">
          <p class="cerimonia-kicker">Celebrações com significado</p>
          <h1 id="cerimonia-title">Cerimônia</h1>
          <p class="cerimonia-hero__text">Cada detalhe preparado para acolher histórias, encontros e momentos que permanecem para sempre.</p>
        </div>
        <div class="cerimonia-hero__mark" aria-hidden="true"><span>Le Jardin</span><strong>amor</strong><span>em cada detalhe</span></div>
      </section>
      <section class="cerimonia-videos" aria-labelledby="videos-title">
        <div class="cerimonia-section-heading"><div><p class="cerimonia-kicker">Inspirações</p><h2 id="videos-title">Momentos para guardar</h2></div><p>Uma seleção de cenas para inspirar a sua próxima celebração.</p></div>
        <div class="cerimonia-video-grid">
          <article v-for="video in videos" :key="video.src" class="cerimonia-video-card">
            <div class="cerimonia-video-frame"><video :src="video.src" controls playsinline preload="metadata" :aria-label="video.title"></video></div>
            <h3>{{ video.title }}</h3><p>{{ video.description }}</p>
          </article>
        </div>
      </section>
    </main>
    <Footer />
  </Page>
</template>

<script setup>
import { useHead } from '@unhead/vue'
import Page from '@/components/builder/Page.vue'
import Header from '@/pages/shared/Header.vue'
import Footer from '@/pages/shared/Footer.vue'
import { cssVars } from './shared/pageCommons.js'

useHead({ htmlAttrs: { lang: 'pt-BR' }, title: 'Cerimônia | Le Jardin Eventos', meta: [{ name: 'description', content: 'Inspirações para cerimônias da Le Jardin Eventos.' }] })

const videos = [
  { src: '/videos/cerimonia-1.mp4', title: 'A beleza do encontro', description: 'Atmosferas pensadas para celebrar o começo de uma nova história.' },
  { src: '/videos/cerimonia-2.mp4', title: 'Detalhes que emocionam', description: 'Cenários acolhedores, flores e luz para tornar o momento inesquecível.' },
]
</script>

<style scoped>
.cerimonia-page{background:#f2ede5;color:#10291a}.cerimonia-hero{display:flex;min-height:520px;align-items:center;justify-content:space-between;gap:48px;padding:120px max(7vw,28px) 88px;background:radial-gradient(circle at 80% 35%,rgba(196,164,74,.25),transparent 30%),linear-gradient(125deg,#01240e,#153b25);color:#f2ede5}.cerimonia-hero__content{max-width:700px}.cerimonia-kicker{margin:0;color:#c4a44a;font:500 12px/1.5 var(--font-secondary);letter-spacing:.2em;text-transform:uppercase}.cerimonia-hero h1{margin:18px 0 0;font:italic 400 clamp(5rem,12vw,10rem)/.82 var(--font-primary);letter-spacing:.01em}.cerimonia-hero__text{max-width:550px;margin:30px 0 0;color:rgba(242,237,229,.8);font:300 18px/1.7 var(--font-secondary)}.cerimonia-hero__mark{display:grid;width:210px;height:210px;flex:0 0 auto;place-content:center;text-align:center;border:1px solid rgba(196,164,74,.65);border-radius:50%;transform:rotate(8deg);color:#f2ede5;font:11px var(--font-secondary);letter-spacing:.16em;text-transform:uppercase}.cerimonia-hero__mark strong{margin:5px 0;font:italic 400 49px var(--font-primary);letter-spacing:0;text-transform:none}.cerimonia-videos{padding:92px max(7vw,28px) 110px}.cerimonia-section-heading{display:flex;align-items:end;justify-content:space-between;gap:36px;max-width:1220px;margin:0 auto 48px}.cerimonia-section-heading h2{margin:14px 0 0;font:400 clamp(3rem,6vw,5.5rem)/.9 var(--font-primary);color:#10291a}.cerimonia-section-heading>p{max-width:260px;margin:0 0 4px;color:rgba(16,41,26,.7);font:14px/1.7 var(--font-secondary);text-align:right}.cerimonia-video-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:30px;max-width:1220px;margin:0 auto}.cerimonia-video-frame{overflow:hidden;background:#10291a;aspect-ratio:16/10}.cerimonia-video-frame video{display:block;width:100%;height:100%;object-fit:cover}.cerimonia-video-card h3{margin:18px 0 0;font:400 32px/1 var(--font-primary)}.cerimonia-video-card p{margin:10px 0 0;color:rgba(16,41,26,.7);font:14px/1.65 var(--font-secondary)}
@media(max-width:920px){.cerimonia-hero{min-height:570px;align-items:flex-start;flex-direction:column;padding:112px 20px 72px}.cerimonia-hero__mark{align-self:flex-end;width:140px;height:140px}.cerimonia-hero__mark strong{font-size:34px}.cerimonia-hero__text{font-size:16px}.cerimonia-videos{padding:72px 20px 88px}.cerimonia-section-heading{display:block;margin-bottom:34px}.cerimonia-section-heading>p{margin-top:20px;text-align:left}.cerimonia-video-grid{grid-template-columns:1fr;gap:42px}}
</style>
