<template>
  <Page pageId="zwx0Rm" locale="system" :cssVars="cssVars" :pageStyle="cssVars"
    googleFontsHref="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap"
    customFontsCss=""
  >
    <Header />
    <div class="page__blocks">
      <BlockLayout blockId="z8NOfP" htmlId="z8NOfP"
        blockClassName="block block--desktop-first-visible block--mobile-first-visible"
        innerClassName="block-layout block-layout--layout"
        :blockStyle="heroStyle" :background="heroBg" />

      <BlockLayout blockId="zPXhgu" htmlId="zPXhgu" blockClassName="block"
        innerClassName="block-layout block-layout--layout"
        :blockStyle="s2Style" :background="darkBg" :isFixed="true">
        <LayoutElement elementId="z0Jqq0" className="layout-element layout-element--layout"
          :style="{'--text':'left','--align':'flex-start','--m-text':'center','--justify':'flex-start','--m-element-margin':'0 0 16px 0','--z-index':1,'--grid-row':'2/3','--grid-column':'2/3','--m-grid-row':'2/3','--m-grid-column':'1/2'}"
          :hasRotationFrame="false" :hasEntranceAnimation="false">
          <GridTextBox id="z0Jqq0" :content="s2Title" textAlign="left" textAlignMobile="center" />
        </LayoutElement>
      </BlockLayout>

      <BlockLayout blockId="zvZHDR" htmlId="zvZHDR" blockClassName="block"
        innerClassName="block-layout block-layout--layout"
        :blockStyle="s3Style" :background="darkBg" :isFixed="true">
        <LayoutElement elementId="z7nX1H" className="layout-element layout-element--layout"
          :style="{'--align':'center','--justify':'center','--m-element-margin':'0 0 16px 0','--z-index':1,'--grid-row':'2/3','--grid-column':'2/3','--m-grid-row':'1/2','--m-grid-column':'1/2'}"
          :hasRotationFrame="false" :hasEntranceAnimation="false">
          <GridVideo id="z7nX1H" src="https://www.youtube.com/embed/lLp8gHRiH-g?h=null&playlist=lLp8gHRiH-g&autoplay=0&controls=1&loop=0&autopause=0&playsinline=1&mute=0" provider="youtube" jpg="https://i.ytimg.com/vi/lLp8gHRiH-g/hqdefault.jpg" webp="https://i.ytimg.com/vi_webp/lLp8gHRiH-g/hqdefault.webp" />
        </LayoutElement>
        <LayoutElement elementId="z3qo2l" className="layout-element layout-element--layout"
          :style="{'--align':'center','--justify':'center','--m-element-margin':'0 0 16px 0','--z-index':2,'--grid-row':'2/3','--grid-column':'4/5','--m-grid-row':'3/4','--m-grid-column':'1/2'}"
          :hasRotationFrame="false" :hasEntranceAnimation="false">
          <GridVideo id="z3qo2l" src="https://www.youtube.com/embed/wnrmnXJ2Ky8?h=null&playlist=wnrmnXJ2Ky8&autoplay=0&controls=1&loop=0&autopause=0&playsinline=1&mute=0" provider="youtube" jpg="https://i.ytimg.com/vi/wnrmnXJ2Ky8/hqdefault.jpg" webp="https://i.ytimg.com/vi_webp/wnrmnXJ2Ky8/hqdefault.webp" />
        </LayoutElement>
        <LayoutElement elementId="zjwLFq" className="layout-element layout-element--layout"
          :style="{'--align':'center','--justify':'center','--m-element-margin':'0 0 16px 0','--z-index':3,'--grid-row':'4/5','--grid-column':'2/3','--m-grid-row':'5/6','--m-grid-column':'1/2'}"
          :hasRotationFrame="false" :hasEntranceAnimation="false">
          <GridVideo id="zjwLFq" src="https://www.youtube.com/embed/Ggcp1TDyJhw?h=null&playlist=Ggcp1TDyJhw&autoplay=0&controls=1&loop=0&autopause=0&playsinline=1&mute=0" provider="youtube" jpg="https://i.ytimg.com/vi/Ggcp1TDyJhw/hqdefault.jpg" webp="https://i.ytimg.com/vi_webp/Ggcp1TDyJhw/hqdefault.webp" />
        </LayoutElement>
        <LayoutElement elementId="zEgELr" className="layout-element layout-element--layout"
          :style="{'--align':'center','--justify':'center','--m-element-margin':'0 0 16px 0','--z-index':4,'--grid-row':'4/5','--grid-column':'4/5','--m-grid-row':'7/8','--m-grid-column':'1/2'}"
          :hasRotationFrame="false" :hasEntranceAnimation="false">
          <GridVideo id="zEgELr" src="https://www.youtube.com/embed/nZxVG5JVpMQ?h=null&playlist=nZxVG5JVpMQ&autoplay=0&controls=1&loop=0&autopause=0&playsinline=1&mute=0" provider="youtube" jpg="https://i.ytimg.com/vi/nZxVG5JVpMQ/hqdefault.jpg" webp="https://i.ytimg.com/vi_webp/nZxVG5JVpMQ/hqdefault.webp" />
        </LayoutElement>
        <LayoutElement elementId="zy1r0x" className="layout-element layout-element--layout"
          :style="{'--align':'center','--justify':'center','--m-element-margin':'0 0 16px 0','--z-index':5,'--grid-row':'6/7','--grid-column':'2/3','--m-grid-row':'9/10','--m-grid-column':'1/2'}"
          :hasRotationFrame="false" :hasEntranceAnimation="false">
          <GridVideo id="zy1r0x" src="https://www.youtube.com/embed/lLp8gHRiH-g?h=null&playlist=lLp8gHRiH-g&autoplay=0&controls=1&loop=0&autopause=0&playsinline=1&mute=0" provider="youtube" jpg="https://i.ytimg.com/vi/lLp8gHRiH-g/hqdefault.jpg" webp="https://i.ytimg.com/vi_webp/lLp8gHRiH-g/hqdefault.webp" />
        </LayoutElement>
        <LayoutElement elementId="zhvI27" className="layout-element layout-element--layout"
          :style="{'--align':'center','--justify':'center','--m-element-margin':'0 0 16px 0','--z-index':6,'--grid-row':'7/8','--grid-column':'2/3','--m-grid-row':'11/12','--m-grid-column':'1/2'}"
          :hasRotationFrame="false" :hasEntranceAnimation="false">
          <GridVideo id="zhvI27" src="https://www.youtube.com/embed/ZJfyptWijm8?h=null&playlist=ZJfyptWijm8&autoplay=0&controls=1&loop=0&autopause=0&playsinline=1&mute=0" provider="youtube" jpg="https://i.ytimg.com/vi/ZJfyptWijm8/hqdefault.jpg" webp="https://i.ytimg.com/vi_webp/ZJfyptWijm8/hqdefault.webp" />
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
import GridVideo from '@/components/builder/elements/GridVideo.vue'
import { cssVars, heroBg, heroStyle } from './shared/pageCommons.js'

usePageSeo({
  title: "Eventos Corporativos em São José do Rio Preto | V J Produções e Eventos",
  description: "Produção, decoração e ambientação de eventos corporativos em São José do Rio Preto - SP, com soluções personalizadas para empresas e marcas.",
  path: "/corporativo",
  serviceName: "Eventos Corporativos",
})

const s2Title = '<h1 dir="auto" style="color: rgb(255, 255, 255); --lineHeightDesktop: 1.2; --fontSizeDesktop: 44px; --lineHeightMobile: 1.3; --fontSizeMobile: 24px; font-style: normal; font-weight: 600;">Decoração de Eventos Corporativos em São José do Rio Preto - SP</h1>'
const darkBg = { color: 'rgb(1, 36, 14)', current: 'color' }

const s2Style = {
  '--block-padding': '16px 0 16px 0', '--m-block-padding': '16px',
  '--m-grid-template-rows': '2.50vw auto 31px',
  '--t-grid-template-rows': 'minmax(9px, auto) minmax(31px, auto) 1fr',
  '--small-desktop-grid-template-rows': 'minmax(3.76vw, auto) minmax(4.74vw, auto) 2.61vw',
  '--grid-template-rows': 'minmax(46px, auto) minmax(58px, auto) 1fr',
  '--m-grid-template-columns': '100.00%', '--grid-template-columns': '27.53% 41.09% 31.37%',
  '--m-block-min-height': 'auto', '--t-block-min-height': '71px',
  '--small-desktop-block-min-height': 'auto', '--block-min-height': '136px',
}

const s3Style = {
  '--block-padding': '16px 0 16px 0', '--m-block-padding': '16px',
  '--m-grid-template-rows': '170.56vw 4.44vw 170.56vw 4.44vw 170.56vw 4.44vw 170.56vw 4.44vw 170.56vw 4.44vw 170.56vw 28px',
  '--t-grid-template-rows': 'minmax(614px, auto) minmax(16px, auto) minmax(614px, auto) minmax(16px, auto) minmax(614px, auto) minmax(16px, auto) minmax(614px, auto) minmax(16px, auto) minmax(614px, auto) minmax(16px, auto) minmax(614px, auto) 1fr',
  '--small-desktop-grid-template-rows': 'minmax(1.96vw, auto) minmax(22.06vw, auto) minmax(4.08vw, auto) minmax(22.06vw, auto) minmax(2.94vw, auto) minmax(22.06vw, auto) minmax(22.06vw, auto) 46.00vw',
  '--grid-template-rows': 'minmax(24px, auto) minmax(270px, auto) minmax(50px, auto) minmax(270px, auto) minmax(36px, auto) minmax(270px, auto) minmax(270px, auto) 1fr',
  '--m-grid-template-columns': '100.00%', '--grid-template-columns': '4.33% 39.22% 8.82% 39.22% 8.42%',
  '--m-block-min-height': 'auto', '--t-block-min-height': '3792px',
  '--small-desktop-block-min-height': 'auto', '--block-min-height': '1753px',
}
</script>
