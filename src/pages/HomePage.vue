<template>
  <Page pageId="home" locale="system" :cssVars="cssVars" :pageStyle="cssVars"
    googleFontsHref="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap"
    customFontsCss=""
  >
    <Header />
    <div class="page__blocks">
      <!-- Section 1: Videos -->
      <BlockLayout
        blockId="z9vOib" htmlId="z9vOib" blockClassName="block" innerClassName="block-layout block-layout--layout"
        :blockStyle="s2Style" :background="{ color: 'rgb(0, 29, 13)', current: 'color' }"
      >

        <LayoutElement elementId="zHomeShort" className="layout-element layout-element--layout"
          :style="{ '--align': 'center', '--justify': 'center', '--m-element-margin': '0 0 16px 0', '--z-index': 1, '--grid-row': '1/2', '--grid-column': '2/5', '--m-grid-row': '1/2', '--m-grid-column': '1/2' }"
          :hasRotationFrame="false" :hasEntranceAnimation="false">
          <GridVideo id="zHomeShort" mobileRatio="9 / 16"
            src="https://www.youtube.com/embed/O1sKoeN-4mM?autoplay=1&controls=1&loop=1&playlist=O1sKoeN-4mM&mute=1&playsinline=1"
            provider="youtube"
            jpg="https://i.ytimg.com/vi/O1sKoeN-4mM/hqdefault.jpg"
            webp="https://i.ytimg.com/vi_webp/O1sKoeN-4mM/hqdefault.webp"
          />
        </LayoutElement>
        <LayoutElement elementId="zHomeVideo" className="layout-element layout-element--layout"
          :style="{ '--align': 'center', '--justify': 'center', '--m-element-margin': '0 0 16px 0', '--z-index': 2, '--grid-row': '3/4', '--grid-column': '3/4', '--m-grid-row': '3/4', '--m-grid-column': '1/2' }"
          :hasRotationFrame="false" :hasEntranceAnimation="false">
          <GridVideo id="zHomeVideo"
            src="https://www.youtube.com/embed/ENxamFIJknY?autoplay=0&controls=1&playsinline=1"
            provider="youtube"
            jpg="https://i.ytimg.com/vi/ENxamFIJknY/hqdefault.jpg"
            webp="https://i.ytimg.com/vi_webp/ENxamFIJknY/hqdefault.webp"
          />
        </LayoutElement>
        <LayoutElement elementId="zPDJEu" className="layout-element layout-element--layout"
          :style="{ '--align': 'center', '--justify': 'center', '--m-element-margin': '0 0 16px 0', '--z-index': 3, '--grid-row': '5/6', '--grid-column': '2/5', '--m-grid-row': '5/6', '--m-grid-column': '1/2' }"
          :hasRotationFrame="false" :hasEntranceAnimation="false">
          <GridVideo id="zPDJEu" mobileRatio="9 / 16"
            src="https://www.youtube.com/embed/m7OETuDX684?autoplay=0&controls=1&playsinline=1"
            provider="youtube"
            jpg="https://i.ytimg.com/vi/m7OETuDX684/hqdefault.jpg"
            webp="https://i.ytimg.com/vi_webp/m7OETuDX684/hqdefault.webp"
          />
        </LayoutElement>
        <LayoutElement elementId="z2a8vn" className="layout-element layout-element--layout"
          :style="{ '--align': 'center', '--justify': 'center', '--m-element-margin': '0 0 16px 0', '--z-index': 4, '--grid-row': '7/8', '--grid-column': '3/4', '--m-grid-row': '7/8', '--m-grid-column': '1/2' }"
          :hasRotationFrame="false" :hasEntranceAnimation="false">
          <GridVideo id="z2a8vn" mobileRatio="9 / 16"
            src="https://www.youtube.com/embed/jol6xQvyitk?autoplay=0&controls=1&playsinline=1"
            provider="youtube"
            jpg="https://i.ytimg.com/vi/jol6xQvyitk/hqdefault.jpg"
            webp="https://i.ytimg.com/vi_webp/jol6xQvyitk/hqdefault.webp"
          />
        </LayoutElement>
      </BlockLayout>

      <Footer />
    </div>
  </Page>
</template>

<script setup>
import { cssVars } from './shared/pageCommons.js'
import { usePageSeo } from './shared/seo.js'
import Page from '@/components/builder/Page.vue'
import Header from '@/pages/shared/Header.vue'
import Footer from '@/pages/shared/Footer.vue'
import BlockLayout from '@/components/builder/layout/BlockLayout.vue'
import LayoutElement from '@/components/builder/layout/LayoutElement.vue'
import GridVideo from '@/components/builder/elements/GridVideo.vue'

usePageSeo({
  title: "Decoração de Eventos | V J Produções e Eventos",
  description: "V J Produções e Eventos cria decoração, ambientação e projetos para casamentos, festas, eventos corporativos e celebrações em São José do Rio Preto - SP.",
  path: "/",
  serviceName: "Decoração e Produção de Eventos",
})

const s2Style = {
  '--block-padding': '16px 0 16px 0', '--m-block-padding': '16px',
  '--m-grid-template-rows': '134.29vw 20px 56.25vw 20px 135.83vw 20px 135.83vw 30px',
  '--t-grid-template-rows': 'minmax(274px, auto) minmax(20px, auto) minmax(274px, auto) minmax(20px, auto) minmax(489px, auto) minmax(20px, auto) minmax(489px, auto) 1fr',
  '--small-desktop-grid-template-rows': 'minmax(22.34vw, auto) minmax(2vw, auto) minmax(22.34vw, auto) minmax(2vw, auto) minmax(62.66vw, auto) minmax(4.58vw, auto) minmax(22.06vw, auto) 1fr',
  '--grid-template-rows': 'minmax(274px, auto) minmax(28px, auto) minmax(274px, auto) minmax(28px, auto) minmax(767px, auto) minmax(56px, auto) minmax(270px, auto) 1fr',
  '--m-grid-template-columns': '100.00%',
  '--grid-template-columns': '27.53% 0.25% 39.22% 0.25% 32.76%',
  '--m-block-min-height': 'auto',
  '--t-block-min-height': 'auto',
  '--small-desktop-block-min-height': 'auto',
  '--block-min-height': 'auto',
}</script>
