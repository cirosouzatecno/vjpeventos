<template>
  <Page pageId="zMTp8J" locale="system" :cssVars="cssVars" :pageStyle="cssVars"
    googleFontsHref="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap"
    customFontsCss="">
    <Header />
    <div class="page__blocks">
      <BlockLayout blockId="zHa_Do" htmlId="zHa_Do"
        blockClassName="block block--desktop-first-visible block--mobile-first-visible"
        innerClassName="block-layout block-layout--layout"
        :blockStyle="heroStyle" :background="heroBg" />

      <BlockLayout blockId="zqmYav" htmlId="zqmYav" blockClassName="block"
        innerClassName="block-layout block-layout--layout"
        :blockStyle="s2Style" :background="darkBg" :isFixed="true">
        <LayoutElement elementId="zOO3Aj" className="layout-element layout-element--layout"
          :style="{'--text':'left','--align':'flex-start','--m-text':'center','--justify':'flex-start','--m-element-margin':'0 0 16px 0','--z-index':1,'--grid-row':'2/3','--grid-column':'3/7','--m-grid-row':'2/3','--m-grid-column':'1/2'}">
          <GridTextBox id="zOO3Aj" :content="s2Title" textAlign="left" textAlignMobile="center" />
        </LayoutElement>
        <LayoutElement v-for="video in videos" :key="video.id" :elementId="video.id" className="layout-element layout-element--layout ceremony-video-element"
          :style="video.style" :hasRotationFrame="false" :hasEntranceAnimation="false">
          <video class="ceremony-video" :src="video.src" controls playsinline preload="metadata" :aria-label="video.label" />
        </LayoutElement>
      </BlockLayout>

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
import GridTextBox from '@/components/builder/elements/GridTextBox.vue'
import { cssVars, heroBg, heroStyle } from './shared/pageCommons.js'

usePageSeo({
  title: "Cerimônias em São José do Rio Preto | V J Produções e Eventos",
  description: "Decoração e ambientação de cerimônias em São José do Rio Preto - SP, com projetos personalizados para criar experiências marcantes.",
  path: "/cerimonia",
  serviceName: "Decoração de Cerimônias",
})

const s2Title = '<h1 dir="auto" style="color: rgb(255, 255, 255); --lineHeightDesktop: 1.2; --fontSizeDesktop: 44px; --lineHeightMobile: 1.3; --fontSizeMobile: 24px; font-style: normal; font-weight: 600;">Decoração de Cerimônias em São José do Rio Preto - SP</h1>'
const darkBg = { color: 'rgb(1, 36, 14)', current: 'color' }

const videos = [
  {
    id: 'cerimonia-1',
    src: '/videos/cerimonia-1.mp4',
    label: 'Vídeo de cerimônia 1',
    style: {'--align':'center','--justify':'center','--m-element-margin':'0 0 16px 0','--z-index':2,'--grid-row':'5/7','--grid-column':'1/4','--m-grid-row':'4/5','--m-grid-column':'1/2'},
  },
  {
    id: 'cerimonia-2',
    src: '/videos/cerimonia-2.mp4',
    label: 'Vídeo de cerimônia 2',
    style: {'--align':'center','--justify':'center','--m-element-margin':'0 0 16px 0','--z-index':3,'--grid-row':'4/6','--grid-column':'5/8','--m-grid-row':'6/7','--m-grid-column':'1/2'},
  },
]

const s2Style = {
  '--block-padding': '16px 0 16px 0', '--m-block-padding': '16px',
  '--m-grid-template-rows': '6.67vw auto 6.94vw 75.00vw 4.44vw 75.00vw 37.87863159179676px',
  '--t-grid-template-rows': 'minmax(24px, auto) minmax(31px, auto) minmax(25px, auto) minmax(270px, auto) minmax(16px, auto) minmax(270px, auto) 1fr',
  '--small-desktop-grid-template-rows': 'minmax(3.76vw, auto) minmax(4.74vw, auto) minmax(4.08vw, auto) minmax(0.33vw, auto) minmax(21.73vw, auto) minmax(0.33vw, auto) minmax(5.07vw, auto) minmax(22.06vw, auto) 28.84vw',
  '--grid-template-rows': 'minmax(46px, auto) minmax(58px, auto) minmax(50px, auto) minmax(4px, auto) minmax(266px, auto) minmax(4px, auto) minmax(62px, auto) minmax(270px, auto) 1fr',
  '--m-grid-template-columns': '100.00%',
  '--grid-template-columns': '25.25% 11.85% 2.12% 10.78% 14.46% 5.31% 19.44% 10.78%',
  '--m-block-min-height': 'auto', '--t-block-min-height': '959.8786315917968px',
  '--small-desktop-block-min-height': 'auto', '--block-min-height': '1113px',
}
</script>

<style scoped>
.ceremony-video-element :deep(.layout-element__content), .ceremony-video-element :deep(.layout-element__children) { width: 100%; height: 100%; }
.ceremony-video { display: block; width: 100%; height: 100%; min-height: 270px; object-fit: cover; background: #001f0c; }
</style>
