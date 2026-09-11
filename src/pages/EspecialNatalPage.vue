<template>
  <Page
    pageId="especial-natal"
    locale="system"
    :cssVars="cssVars"
    :pageStyle="cssVars"
    googleFontsHref="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap"
    customFontsCss=""
  >
    <Header />
    <div class="page__blocks natal-page__blocks">
      <main class="natal-page">
        <section class="natal-hero" aria-labelledby="natal-title">
          <div class="natal-hero__content">
            <p class="natal-kicker">Le Jardin Eventos · coleção sazonal</p>
            <h1 id="natal-title">Especial Natal</h1>
            <p class="natal-hero__text">Uma seleção de decorações natalinas para inspirar celebrações cheias de luz, afeto e detalhes marcantes.</p>
            <a class="natal-hero__link" href="#galeria-natal">Explorar a galeria <span aria-hidden="true">↓</span></a>
          </div>
          <div class="natal-hero__seal" aria-hidden="true"><span>feliz</span><strong>Natal</strong><small>Le Jardin</small></div>
        </section>

        <section id="galeria-natal" class="natal-gallery" aria-labelledby="galeria-title">
          <div class="natal-gallery__intro">
            <div><p class="natal-kicker natal-kicker--dark">Inspirações</p><h2 id="galeria-title">Detalhes que aquecem a celebração</h2></div>
            <p class="natal-gallery__hint">Clique em qualquer imagem para visualizar em tamanho maior.</p>
          </div>
          <div class="natal-gallery__grid">
            <button v-for="image in galleryImages" :key="image.id" type="button" class="natal-card" :class="{'natal-card--featured': image.featured}" :aria-label="'Visualizar ' + image.alt + ' em tamanho maior'" @click="openLightbox(image)">
              <span class="natal-card__media"><img :src="image.src" :alt="image.alt" loading="lazy" /><span class="natal-card__zoom" aria-hidden="true">＋</span></span>
              <span class="natal-card__caption">{{ image.caption }}</span>
            </button>
          </div>
        </section>

        <div v-if="activeImage" class="natal-lightbox" role="dialog" aria-modal="true" :aria-label="'Imagem ampliada: ' + activeImage.alt" tabindex="-1" @click.self="closeLightbox" @keydown.esc="closeLightbox">
          <button type="button" class="natal-lightbox__close" aria-label="Fechar imagem ampliada" @click="closeLightbox">×</button>
          <figure class="natal-lightbox__figure"><img :src="activeImage.src" :alt="activeImage.alt" /><figcaption>{{ activeImage.caption }}</figcaption></figure>
        </div>
      </main>
    </div>
    <Footer />
  </Page>
</template>

<script setup>
import { onBeforeUnmount, ref, watch } from 'vue'
import { useHead } from '@unhead/vue'
import Page from '@/components/builder/Page.vue'
import Header from '@/pages/shared/Header.vue'
import Footer from '@/pages/shared/Footer.vue'
import { cssVars } from './shared/pageCommons.js'
import image1 from '@/assets/natal/1.jpg'
import image2 from '@/assets/natal/2.jpg'
import image3 from '@/assets/natal/3.jpg'
import image4 from '@/assets/natal/4.jpg'
import image5 from '@/assets/natal/5.jpg'
import image6 from '@/assets/natal/6.jpg'
import image7 from '@/assets/natal/7.jpg'
import image8 from '@/assets/natal/8.jpg'
import image9 from '@/assets/natal/9.jpg'
import image11 from '@/assets/natal/11.jpg'

useHead({ htmlAttrs: { lang: 'pt-BR' }, title: 'Especial Natal | Le Jardin Eventos', meta: [{ name: 'description', content: 'Galeria de inspirações natalinas da Le Jardin Eventos.' }] })

const galleryImages = [
  { id: 11, src: image11, alt: 'Árvore de Natal com laços vermelhos e luzes douradas', caption: 'Natal clássico em vermelho e dourado', featured: true },
  { id: 9, src: image9, alt: 'Árvore de Natal decorada em tons de rosa e dourado', caption: 'Elegância em rosa, dourado e luzes' },
  { id: 8, src: image8, alt: 'Árvore de Natal com personagens e laços vermelhos', caption: 'Uma celebração lúdica e afetiva' },
  { id: 7, src: image7, alt: 'Guirlanda natalina em porta verde', caption: 'Boas-vindas à mesa e à casa' },
  { id: 6, src: image6, alt: 'Árvore de Natal decorada em tons de rosa', caption: 'Composição artesanal cheia de personalidade' },
  { id: 5, src: image5, alt: 'Árvore de Natal decorada com laços vermelhos e dourados', caption: 'Volume, brilho e presença' },
  { id: 4, src: image4, alt: 'Árvore de Natal com laços vermelhos e luzes douradas', caption: 'Natal clássico em vermelho e dourado' },
  { id: 3, src: image3, alt: 'Árvore de Natal decorada em tons de rosa e dourado', caption: 'Elegância em rosa, dourado e luzes' },
  { id: 2, src: image2, alt: 'Árvore de Natal com presentes e enfeites vermelhos', caption: 'Encanto natalino em cada detalhe' },
  { id: 1, src: image1, alt: 'Árvore de Natal em tons de rosa, champagne e dourado', caption: 'Uma paleta suave para celebrar' },
]

const activeImage = ref(null)
const openLightbox = (image) => { activeImage.value = image }
const closeLightbox = () => { activeImage.value = null }
watch(activeImage, (image) => { document.body.style.overflow = image ? 'hidden' : '' })
onBeforeUnmount(() => { document.body.style.overflow = '' })
</script>

<style scoped>
.natal-page__blocks{padding-top:var(--header-height-mobile,var(--header-height,0));margin-top:calc(-1 * var(--header-height-mobile,var(--header-height,0)))}
.natal-page{background:rgb(1,36,14);color:rgb(242,237,229)}
.natal-hero{position:relative;display:flex;min-height:560px;align-items:center;justify-content:space-between;gap:56px;overflow:hidden;padding:120px max(6vw,32px) 104px;isolation:isolate;background:radial-gradient(circle at 84% 28%,rgba(196,164,74,.24),transparent 34%),linear-gradient(115deg,rgba(1,36,14,.98),rgba(15,26,18,.72))}
.natal-hero:before,.natal-hero:after{position:absolute;content:'';pointer-events:none;border:1px solid rgba(196,164,74,.32);border-radius:999px;transform:rotate(-16deg)}
.natal-hero:before{right:8%;top:-48%;width:640px;height:900px}
.natal-hero:after{right:18%;bottom:-64%;width:440px;height:700px;border-color:rgba(200,92,58,.35)}
.natal-hero__content{position:relative;z-index:1;max-width:680px}
.natal-kicker{margin:0;color:rgb(242,237,229);font:500 13px/1.5 var(--font-secondary);letter-spacing:.18em;text-transform:uppercase}
.natal-kicker--dark{color:rgb(242,237,229)}
.natal-hero h1,.natal-gallery h2{margin:18px 0 0;font-family:var(--font-primary);font-weight:400;letter-spacing:.01em;line-height:.95}
.natal-hero h1{color:rgb(242,237,229);font-size:clamp(4.5rem,10vw,9rem);font-style:italic}
.natal-hero__text{max-width:540px;margin:30px 0 0;color:rgba(242,237,229,.78);font:300 18px/1.7 var(--font-secondary)}
.natal-hero__link{display:inline-flex;gap:14px;margin-top:34px;padding-bottom:8px;border-bottom:1px solid rgb(196,164,74);color:rgb(242,237,229);font:500 13px var(--font-secondary);letter-spacing:.08em;text-decoration:none;text-transform:uppercase;transition:gap 180ms ease,color 180ms ease}
.natal-hero__link:hover,.natal-hero__link:focus-visible{gap:20px;color:rgb(196,164,74)}
.natal-hero__seal{display:grid;width:210px;height:210px;flex:0 0 auto;place-content:center;text-align:center;border:1px solid rgba(196,164,74,.6);border-radius:50%;color:rgb(242,237,229);transform:rotate(8deg)}
.natal-hero__seal span,.natal-hero__seal small{font:11px var(--font-secondary);letter-spacing:.2em;text-transform:uppercase}
.natal-hero__seal strong{margin:4px 0;font:italic 400 48px var(--font-primary)}
.natal-gallery{padding:100px max(6vw,32px) 120px;background:rgb(1,36,14);color:rgb(242,237,229)}
.natal-gallery__intro{display:flex;align-items:end;justify-content:space-between;gap:36px;max-width:1224px;margin:0 auto 52px}
.natal-gallery h2{max-width:600px;color:rgb(242,237,229);font-size:clamp(2.8rem,5vw,5rem)}
.natal-gallery__hint{max-width:250px;margin:0 0 6px;color:rgba(242,237,229,.78);font:14px/1.7 var(--font-secondary);text-align:right}
.natal-gallery__grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px;max-width:1224px;margin:0 auto}
.natal-card{display:block;min-width:0;padding:0;color:rgb(242,237,229);text-align:left;cursor:zoom-in}
.natal-card--featured{grid-column:span 2}
.natal-card__media{position:relative;display:block;overflow:hidden;aspect-ratio:4/5;background:rgb(225,216,200)}
.natal-card--featured .natal-card__media{aspect-ratio:16/10}
.natal-card__media img{display:block;width:100%;height:100%;object-fit:cover;transition:transform 420ms cubic-bezier(.2,.75,.25,1),filter 420ms ease}
.natal-card:hover .natal-card__media img,.natal-card:focus-visible .natal-card__media img{filter:saturate(1.08);transform:scale(1.045)}
.natal-card__media:after{position:absolute;inset:0;content:'';pointer-events:none;background:linear-gradient(180deg,transparent 48%,rgba(1,36,14,.36));opacity:0;transition:opacity 220ms ease}
.natal-card:hover .natal-card__media:after,.natal-card:focus-visible .natal-card__media:after{opacity:1}
.natal-card__zoom{position:absolute;right:18px;bottom:16px;z-index:1;display:grid;width:36px;height:36px;place-items:center;border:1px solid rgba(242,237,229,.72);border-radius:50%;color:rgb(242,237,229);font:300 23px var(--font-secondary);opacity:0;transition:opacity 220ms ease,transform 220ms ease}
.natal-card:hover .natal-card__zoom,.natal-card:focus-visible .natal-card__zoom{opacity:1;transform:translateY(-4px)}
.natal-card__caption{display:block;padding:16px 4px 0;color:rgb(242,237,229);font:24px/1.05 var(--font-primary)}
.natal-lightbox{position:fixed;inset:0;z-index:50;display:grid;place-items:center;padding:28px;background:rgba(1,15,8,.94);animation:natal-fade-in 180ms ease-out}
.natal-lightbox__figure{display:grid;max-width:min(94vw,1180px);max-height:94vh;margin:0;justify-items:center}
.natal-lightbox__figure img{display:block;width:auto;max-width:92vw;max-height:84vh;object-fit:contain}
.natal-lightbox__figure figcaption{margin-top:14px;color:rgb(242,237,229);font:14px/1.4 var(--font-secondary);text-align:center}
.natal-lightbox__close{position:absolute;top:20px;right:28px;z-index:1;display:grid;width:48px;height:48px;place-items:center;border:1px solid rgba(242,237,229,.45);border-radius:50%;color:rgb(242,237,229);font:300 38px var(--font-primary);line-height:1;transition:transform 180ms ease,color 180ms ease,border-color 180ms ease}
.natal-lightbox__close:hover,.natal-lightbox__close:focus-visible{border-color:rgb(196,164,74);color:rgb(196,164,74);transform:rotate(90deg)}
.natal-card:focus-visible,.natal-hero__link:focus-visible,.natal-lightbox__close:focus-visible{outline:2px solid rgb(200,92,58);outline-offset:5px}
@keyframes natal-fade-in{from{opacity:0}to{opacity:1}}
@media screen and (max-width:920px){.natal-hero{min-height:520px;align-items:flex-start;flex-direction:column;padding:112px 20px 72px}.natal-hero h1{font-size:clamp(4rem,18vw,7rem)}.natal-hero__text{margin-top:22px;font-size:16px}.natal-hero__seal{position:absolute;right:22px;bottom:34px;width:126px;height:126px}.natal-hero__seal strong{font-size:31px}.natal-gallery{padding:72px 20px 88px}.natal-gallery__intro{display:block;margin-bottom:34px}.natal-gallery__hint{margin-top:20px;text-align:left}.natal-gallery__grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:16px 12px}.natal-card--featured{grid-column:span 2}.natal-card__caption{padding-top:11px;font-size:20px}.natal-lightbox{padding:18px}.natal-lightbox__figure img{max-width:96vw;max-height:78vh}.natal-lightbox__close{top:12px;right:16px}}
@media screen and (max-width:520px){.natal-hero{min-height:580px}.natal-gallery__grid{grid-template-columns:1fr}.natal-card--featured{grid-column:span 1}.natal-card__media,.natal-card--featured .natal-card__media{aspect-ratio:4/5}.natal-hero__seal{right:20px;bottom:24px}}
</style>
