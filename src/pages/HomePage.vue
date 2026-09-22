<template>
  <Page pageId="home" locale="system" :cssVars="cssVars" :pageStyle="cssVars"
    googleFontsHref="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap"
    customFontsCss=""
  >
    <Header />
    <div class="page__blocks">
      <!-- Section 1: Hero -->
      <BlockLayout
        blockId="4hwoujdY3o" htmlId="4hwoujdY3o"
        blockClassName="block block--desktop-first-visible block--mobile-first-visible"
        innerClassName="block-layout block-layout--layout"
        :blockStyle="s1Style"
        :background="s1Background"
        :backgroundImagePosition="10"
      >
        <LayoutElement elementId="zuCc5h" className="layout-element layout-element--layout"
          :style="{ '--z-index': 1, '--grid-row': '2/3', '--grid-column': '1/2', '--m-grid-row': '2/3', '--m-grid-column': '1/2' }"
          :hasRotationFrame="false" :hasEntranceAnimation="false">
          <GridEmbed id="zuCc5h" :content="audioEmbedContent" />
        </LayoutElement>
      </BlockLayout>

      <section class="home-seo-heading" aria-labelledby="home-main-title">
        <h1 id="home-main-title">Decoração de Eventos em São José do Rio Preto - SP</h1>
      </section>

      <!-- Section 2: Videos -->
      <BlockLayout
        blockId="z9vOib" htmlId="z9vOib" blockClassName="block" innerClassName="block-layout block-layout--layout"
        :blockStyle="s2Style" :background="{ color: 'rgb(0, 29, 13)', current: 'color' }"
      >
        <LayoutElement elementId="dco9jz" className="layout-element layout-element--layout"
          :style="{ '--align': 'center', '--justify': 'center', '--m-element-margin': '0 0 24px 0', '--z-index': 1, '--grid-row': '1/2', '--grid-column': '2/5', '--m-grid-row': '1/2', '--m-grid-column': '1/2', 'aspect-ratio': '16 / 9', 'width': '100%' }"
          :hasRotationFrame="false" :hasEntranceAnimation="false">
          <GridVideo id="dco9jz"
            src="https://www.youtube.com/embed/dco9jz2aL7o?autoplay=0&controls=1&playsinline=1"
            provider="youtube"
            jpg="https://i.ytimg.com/vi/dco9jz2aL7o/hqdefault.jpg"
            webp="https://i.ytimg.com/vi_webp/dco9jz2aL7o/hqdefault.webp"
            style="aspect-ratio: 16 / 9; width: 100%; height: 100%;"
          />
        </LayoutElement>
        <LayoutElement elementId="zrLOTN" className="layout-element layout-element--layout"
          :style="{ '--align': 'center', '--justify': 'center', '--m-element-margin': '0 0 24px 0', '--z-index': 2, '--grid-row': '4/5', '--grid-column': '2/5', '--m-grid-row': '3/4', '--m-grid-column': '1/2' }"
          :hasRotationFrame="false" :hasEntranceAnimation="false">
          <GridVideo id="zrLOTN"
            src="https://www.youtube.com/embed/rLOTNCj1x1g?autoplay=0&controls=1&playsinline=1"
            provider="youtube"
            jpg="https://i.ytimg.com/vi/rLOTNCj1x1g/hqdefault.jpg"
            webp="https://i.ytimg.com/vi_webp/rLOTNCj1x1g/hqdefault.webp"
            style="aspect-ratio: 16 / 9; width: 100%; height: 100%;"
          />
        </LayoutElement>
        <LayoutElement elementId="zPDJEu" className="layout-element layout-element--layout"
          :style="{ '--align': 'center', '--justify': 'center', '--m-element-margin': '0 0 16px 0', '--z-index': 3, '--grid-row': '6/7', '--grid-column': '2/5', '--m-grid-row': '5/6', '--m-grid-column': '1/2' }"
          :hasRotationFrame="false" :hasEntranceAnimation="false">
          <GridVideo id="zPDJEu"
            src="https://www.youtube.com/embed/m7OETuDX684?autoplay=0&controls=1&playsinline=1"
            provider="youtube"
            jpg="https://i.ytimg.com/vi/m7OETuDX684/hqdefault.jpg"
            webp="https://i.ytimg.com/vi_webp/m7OETuDX684/hqdefault.webp"
          />
        </LayoutElement>
        <LayoutElement elementId="z2a8vn" className="layout-element layout-element--layout"
          :style="{ '--align': 'center', '--justify': 'center', '--m-element-margin': '0 0 16px 0', '--z-index': 4, '--grid-row': '8/9', '--grid-column': '3/4', '--m-grid-row': '7/8', '--m-grid-column': '1/2' }"
          :hasRotationFrame="false" :hasEntranceAnimation="false">
          <GridVideo id="z2a8vn"
            src="https://www.youtube.com/embed/jol6xQvyitk?autoplay=0&controls=1&playsinline=1"
            provider="youtube"
            jpg="https://i.ytimg.com/vi/jol6xQvyitk/hqdefault.jpg"
            webp="https://i.ytimg.com/vi_webp/jol6xQvyitk/hqdefault.webp"
          />
        </LayoutElement>
      </BlockLayout>

      <!-- Section 3: Spacer -->
      <BlockLayout
        blockId="z_mQ4R" htmlId="z_mQ4R" blockClassName="block" innerClassName="block-layout block-layout--layout"
        :blockStyle="s3Style" :background="{ color: 'rgb(0, 29, 13)', current: 'color' }"
      />

      <Footer />
    </div>
  </Page>
</template>

<script setup>
import { usePageSeo } from './shared/seo.js'
import Page from '@/components/builder/Page.vue'
import Header from '@/pages/shared/Header.vue'
import Footer from '@/pages/shared/Footer.vue'
import BlockLayout from '@/components/builder/layout/BlockLayout.vue'
import LayoutElement from '@/components/builder/layout/LayoutElement.vue'
import GridEmbed from '@/components/builder/elements/GridEmbed.vue'
import GridVideo from '@/components/builder/elements/GridVideo.vue'

usePageSeo({
  title: "Decoração de Eventos em São José do Rio Preto | V J Produções e Eventos",
  description: "V J Produções e Eventos cria decoração, ambientação e projetos para casamentos, festas, eventos corporativos e celebrações em São José do Rio Preto - SP.",
  path: "/",
  serviceName: "Decoração e Produção de Eventos",
})

const cssVars = {
  '--h1-font-size': '80px', '--h1-font-style': 'italic', '--h1-font-family': 'var(--font-primary)',
  '--h1-font-weight': 300, '--h1-line-height': '1.2', '--h1-m-font-size': '52px',
  '--h1-letter-spacing': 'normal', '--h1-text-transform': 'none', '--h1-text-decoration': 'none',
  '--h2-font-size': '56px', '--h2-font-style': 'normal', '--h2-font-family': 'var(--font-primary)',
  '--h2-font-weight': 400, '--h2-line-height': '1.2', '--h2-m-font-size': '40px',
  '--h2-letter-spacing': 'normal', '--h2-text-transform': 'none', '--h2-text-decoration': 'none',
  '--h3-font-size': '44px', '--h3-font-style': 'normal', '--h3-font-family': 'var(--font-primary)',
  '--h3-font-weight': 600, '--h3-line-height': '1.2', '--h3-m-font-size': '32px',
  '--h3-letter-spacing': 'normal', '--h3-text-transform': 'none', '--h3-text-decoration': 'none',
  '--h4-font-size': '32px', '--h4-font-style': 'normal', '--h4-font-family': 'var(--font-primary)',
  '--h4-font-weight': 400, '--h4-line-height': '1.2', '--h4-m-font-size': '26px',
  '--h4-letter-spacing': 'normal', '--h4-text-transform': 'none', '--h4-text-decoration': 'none',
  '--h5-font-size': '24px', '--h5-font-style': 'normal', '--h5-font-family': 'var(--font-primary)',
  '--h5-font-weight': 600, '--h5-line-height': '1.2', '--h5-m-font-size': '20px',
  '--h5-letter-spacing': 'normal', '--h5-text-transform': 'none', '--h5-text-decoration': 'none',
  '--h6-font-size': '13px', '--h6-font-style': 'normal', '--h6-font-family': 'var(--font-primary)',
  '--h6-font-weight': 600, '--h6-line-height': '1.5', '--h6-m-font-size': '13px',
  '--h6-letter-spacing': '0.18em', '--h6-text-transform': 'uppercase', '--h6-text-decoration': 'none',
  '--body-font-size': '16px', '--body-font-style': 'normal', '--body-font-family': 'var(--font-secondary)',
  '--body-font-weight': 300, '--body-line-height': '1.5', '--body-m-font-size': '15px',
  '--body-letter-spacing': 'normal', '--body-text-transform': 'normal', '--body-text-decoration': 'none',
  '--font-primary': "'Cormorant Garamond', Georgia, serif",
  '--font-secondary': "'Plus Jakarta Sans', system-ui, sans-serif",
  '--nav-link-color': 'rgb(242, 237, 229)', '--nav-link-font-size': '13px',
  '--nav-link-font-style': 'normal', '--nav-link-color-hover': 'rgb(196, 164, 74)',
  '--nav-link-font-family': 'var(--font-secondary)', '--nav-link-font-weight': 500,
  '--nav-link-line-height': '1.35', '--nav-link-m-font-size': '13px',
  '--nav-link-letter-spacing': '0.06em', '--nav-link-text-transform': 'none',
  '--nav-link-text-decoration': 'none',
  '--body-large-font-size': '19px', '--body-large-font-style': 'normal',
  '--body-large-font-family': 'var(--font-secondary)', '--body-large-font-weight': 400,
  '--body-large-line-height': '1.5', '--body-large-m-font-size': '19px',
  '--body-large-letter-spacing': 'normal', '--body-large-text-transform': 'none',
  '--body-large-text-decoration': 'none',
  '--body-small-font-size': '13px', '--body-small-font-style': 'normal',
  '--body-small-font-family': 'var(--font-secondary)', '--body-small-font-weight': 400,
  '--body-small-line-height': '1.5', '--body-small-m-font-size': '13px',
  '--body-small-letter-spacing': 'normal', '--body-small-text-transform': 'none',
  '--body-small-text-decoration': 'none',
  '--grid-button-primary-font-size': '12px', '--grid-button-primary-padding-x': '32px',
  '--grid-button-primary-padding-y': '14px', '--grid-button-primary-font-style': 'normal',
  '--grid-button-primary-font-family': 'var(--font-secondary)', '--grid-button-primary-font-weight': 500,
  '--grid-button-primary-line-height': 'normal', '--grid-button-primary-m-font-size': '12px',
  '--grid-button-primary-border-radius': '2px', '--grid-button-primary-letter-spacing': '0.08em',
  '--grid-button-primary-text-transform': 'uppercase', '--grid-button-primary-text-decoration': 'none',
  '--grid-button-primary-background-color': 'rgb(200, 92, 58)',
  '--grid-button-primary-background-color-hover': 'rgb(176, 76, 44)',
  '--grid-button-secondary-font-size': '14px', '--grid-button-secondary-padding-x': '40px',
  '--grid-button-secondary-padding-y': '16px', '--grid-button-secondary-font-family': 'var(--font-secondary)',
  '--grid-button-secondary-font-weight': 400, '--grid-button-secondary-border-radius': '2px',
  '--grid-button-secondary-text-transform': 'none', '--grid-button-secondary-background-color': 'transparent',
  '--grid-button-secondary-background-color-hover': 'rgba(139, 105, 20, 0.12)',
}

const audioEmbedContent = '<iframe width="0" height="0" src="https://www.youtube.com/embed/INCURvH0F7o?autoplay=1&loop=1&playlist=INCURvH0F7o&controls=0" title="YouTube audio player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'

const s1Style = {
  '--rows': 11, '--width': '1224px', '--row-gap': '16px', '--row-size': '48px', '--column-gap': '24px',
  '--block-padding': '16px 0', '--m-block-padding': '120px 16px 120px 16px',
  '--m-grid-template-rows': '4.44vw auto 133.2078094482422px',
  '--t-grid-template-rows': 'minmax(16px, auto) minmax(18px, auto) 1fr',
  '--small-desktop-grid-template-rows': 'minmax(4.08vw, auto) minmax(1.47vw, auto) 54.25vw',
  '--grid-template-rows': 'minmax(50px, auto) minmax(18px, auto) 1fr',
  '--m-grid-template-columns': '100.00%',
  '--grid-template-columns': '32.68% 67.32%',
  '--m-block-min-height': 'auto',
  '--t-block-min-height': '167.2078094482422px',
  '--small-desktop-block-min-height': 'auto',
  '--block-min-height': '732px',
}

const s1Background = {
  type: 'image',
  src: 'https://horizons-cdn.hostinger.com/9ff0c242-ec08-4248-b694-3de2ee09bf42/img-20260605-wa0001-E2V4bcFE1sMqHZLZ.jpg?width=1440&fit=crop',
  srcset: 'https://horizons-cdn.hostinger.com/9ff0c242-ec08-4248-b694-3de2ee09bf42/img-20260605-wa0001-E2V4bcFE1sMqHZLZ.jpg?width=375&fit=crop 375w, https://horizons-cdn.hostinger.com/9ff0c242-ec08-4248-b694-3de2ee09bf42/img-20260605-wa0001-E2V4bcFE1sMqHZLZ.jpg?width=768&fit=crop 768w, https://horizons-cdn.hostinger.com/9ff0c242-ec08-4248-b694-3de2ee09bf42/img-20260605-wa0001-E2V4bcFE1sMqHZLZ.jpg?width=1024&fit=crop 1024w, https://horizons-cdn.hostinger.com/9ff0c242-ec08-4248-b694-3de2ee09bf42/img-20260605-wa0001-E2V4bcFE1sMqHZLZ.jpg?width=1440&fit=crop 1440w, https://horizons-cdn.hostinger.com/9ff0c242-ec08-4248-b694-3de2ee09bf42/img-20260605-wa0001-E2V4bcFE1sMqHZLZ.jpg?width=1920&fit=crop 1920w, https://horizons-cdn.hostinger.com/9ff0c242-ec08-4248-b694-3de2ee09bf42/img-20260605-wa0001-E2V4bcFE1sMqHZLZ.jpg?width=2560&fit=crop 2560w',
  current: 'image',
}

const s2Style = {
  '--block-padding': '16px 0 16px 0', '--m-block-padding': '16px',
  '--m-grid-template-rows': '56.25vw 20px 56.25vw 20px 135.83vw 20px 135.83vw 30px',
  '--t-grid-template-rows': 'minmax(274px, auto) minmax(20px, auto) minmax(274px, auto) minmax(20px, auto) minmax(489px, auto) minmax(20px, auto) minmax(489px, auto) 1fr',
  '--small-desktop-grid-template-rows': 'minmax(22.34vw, auto) minmax(2vw, auto) minmax(22.34vw, auto) minmax(2vw, auto) minmax(62.66vw, auto) minmax(4.58vw, auto) minmax(22.06vw, auto) 1fr',
  '--grid-template-rows': 'minmax(274px, auto) minmax(28px, auto) minmax(274px, auto) minmax(28px, auto) minmax(767px, auto) minmax(56px, auto) minmax(270px, auto) 1fr',
  '--m-grid-template-columns': '100.00%',
  '--grid-template-columns': '27.53% 0.25% 39.22% 0.25% 32.76%',
  '--m-block-min-height': 'auto',
  '--t-block-min-height': 'auto',
  '--small-desktop-block-min-height': 'auto',
  '--block-min-height': 'auto',
}

const s3Style = {
  '--cols': '12', '--rows': 8, '--width': '1224px', '--m-rows': '1',
  '--col-gap': '24px', '--row-gap': '16px', '--row-size': '48px', '--column-gap': '24px',
  '--block-padding': '16px 0 16px 0', '--m-block-padding': '40px 16px 40px 16px',
  '--m-grid-template-rows': ' 1fr', '--t-grid-template-rows': ' 1fr',
  '--small-desktop-grid-template-rows': ' 1fr', '--grid-template-rows': ' 1fr',
  '--m-grid-template-columns': '100.00%', '--grid-template-columns': '100.00%',
  '--m-block-min-height': '43.0087890625px', '--t-block-min-height': '43.0087890625px',
  '--small-desktop-block-min-height': '45.751633986928105vw', '--block-min-height': '560px',
}
</script>


<style scoped>
.home-seo-heading {
  padding: 36px 24px 28px;
  background: rgb(0, 29, 13);
  color: rgb(242, 237, 229);
  text-align: center;
}
.home-seo-heading h1 {
  max-width: 1100px;
  margin: 0 auto;
  font-size: clamp(2rem, 4vw, 3.5rem);
  line-height: 1.08;
}
</style>
