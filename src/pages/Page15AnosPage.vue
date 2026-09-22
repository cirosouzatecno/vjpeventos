<template>
  <Page pageId="zYdbyU" locale="system" :cssVars="cssVars" :pageStyle="cssVars"
    googleFontsHref="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap"
    customFontsCss=""
  >
    <Header />
    <div class="page__blocks">
      <BlockLayout blockId="zXxA47" htmlId="zXxA47"
        blockClassName="block block--desktop-first-visible block--mobile-first-visible"
        innerClassName="block-layout block-layout--layout"
        :blockStyle="heroStyle" :background="heroBg" />

      <BlockLayout blockId="zdWjO2" htmlId="zdWjO2" blockClassName="block"
        innerClassName="block-layout block-layout--layout"
        :blockStyle="s2Style" :background="darkBg" :isFixed="true">
        <LayoutElement elementId="zn4cBJ" className="layout-element layout-element--layout"
          :style="{'--text':'left','--align':'flex-start','--m-text':'center','--justify':'flex-start','--m-element-margin':'0 0 16px 0','--z-index':1,'--grid-row':'2/3','--grid-column':'2/3','--m-grid-row':'2/3','--m-grid-column':'1/2'}"
          :hasRotationFrame="false" :hasEntranceAnimation="false">
          <GridTextBox id="zn4cBJ" :content="s2Title" textAlign="left" textAlignMobile="center" />
        </LayoutElement>
      </BlockLayout>

      <BlockLayout blockId="zheKY6" htmlId="zheKY6" blockClassName="block"
        innerClassName="block-layout block-layout--layout"
        :blockStyle="s3Style" :background="darkBg" :isFixed="true">
        <LayoutElement elementId="zOlwhY" className="layout-element layout-element--layout"
          :style="{'--align':'center','--justify':'center','--m-element-margin':'0 0 16px 0','--z-index':1,'--grid-row':'2/3','--grid-column':'2/3','--m-grid-row':'2/3','--m-grid-column':'2/3'}"
          :hasRotationFrame="false" :hasEntranceAnimation="false">
          <GridVideo id="zOlwhY" src="https://www.youtube.com/embed/b_U5UsKwP-4?h=null&playlist=b_U5UsKwP-4&autoplay=0&controls=1&loop=0&autopause=0&playsinline=1&mute=0" provider="youtube" jpg="https://i.ytimg.com/vi/b_U5UsKwP-4/hqdefault.jpg" webp="https://i.ytimg.com/vi_webp/b_U5UsKwP-4/hqdefault.webp" />
        </LayoutElement>
        <LayoutElement elementId="zf3gc0" className="layout-element layout-element--layout"
          :style="{'--align':'center','--justify':'center','--m-element-margin':'0 0 16px 0','--z-index':2,'--grid-row':'3/4','--grid-column':'2/3','--m-grid-row':'4/5','--m-grid-column':'2/3'}"
          :hasRotationFrame="false" :hasEntranceAnimation="false">
          <GridVideo id="zf3gc0" src="https://www.youtube.com/embed/XW1wM9aRoAk?h=null&playlist=XW1wM9aRoAk&autoplay=0&controls=1&loop=0&autopause=0&playsinline=1&mute=0" provider="youtube" jpg="https://i.ytimg.com/vi/XW1wM9aRoAk/hqdefault.jpg" webp="https://i.ytimg.com/vi_webp/XW1wM9aRoAk/hqdefault.webp" />
        </LayoutElement>
        <LayoutElement elementId="zaD9zf" className="layout-element layout-element--layout"
          :style="{'--align':'center','--justify':'center','--m-element-margin':'0 0 16px 0','--z-index':3,'--grid-row':'4/5','--grid-column':'2/3','--m-grid-row':'6/7','--m-grid-column':'2/3'}"
          :hasRotationFrame="false" :hasEntranceAnimation="false">
          <GridVideo id="zaD9zf" src="https://www.youtube.com/embed/pr45v1cjmJo?h=null&playlist=pr45v1cjmJo&autoplay=0&controls=1&loop=0&autopause=0&playsinline=1&mute=0" provider="youtube" jpg="https://i.ytimg.com/vi/pr45v1cjmJo/hqdefault.jpg" webp="https://i.ytimg.com/vi_webp/pr45v1cjmJo/hqdefault.webp" />
        </LayoutElement>
        <LayoutElement elementId="zIdwMV" className="layout-element layout-element--layout"
          :style="{'--align':'center','--justify':'center','--m-element-margin':'0 0 16px 0','--z-index':4,'--grid-row':'5/6','--grid-column':'2/3','--m-grid-row':'8/9','--m-grid-column':'2/3'}"
          :hasRotationFrame="false" :hasEntranceAnimation="false">
          <GridVideo id="zIdwMV" src="https://www.youtube.com/embed/w9qgYRzc7gA?h=null&playlist=w9qgYRzc7gA&autoplay=0&controls=1&loop=0&autopause=0&playsinline=1&mute=0" provider="youtube" jpg="https://i.ytimg.com/vi/w9qgYRzc7gA/hqdefault.jpg" webp="https://i.ytimg.com/vi_webp/w9qgYRzc7gA/hqdefault.webp" />
        </LayoutElement>
      </BlockLayout>

      <Footer />
    </div>
  </Page>
</template>

<script setup>
import { useHead } from '@unhead/vue'
import Page from '@/components/builder/Page.vue'
import Header from '@/pages/shared/Header.vue'
import Footer from '@/pages/shared/Footer.vue'
import BlockLayout from '@/components/builder/layout/BlockLayout.vue'
import LayoutElement from '@/components/builder/layout/LayoutElement.vue'
import GridTextBox from '@/components/builder/elements/GridTextBox.vue'
import GridVideo from '@/components/builder/elements/GridVideo.vue'
import { cssVars, heroBg, heroStyle } from './shared/pageCommons.js'

useHead({ htmlAttrs: { lang: 'pt-BR' }, title: 'Festas de 15 Anos em São José do Rio Preto | V J Produções e Eventos' })

const s2Title = '<h1 dir="auto" style="color: rgb(255, 255, 255); --lineHeightDesktop: 1.2; --fontSizeDesktop: 44px; --lineHeightMobile: 1.3; --fontSizeMobile: 24px; font-style: normal; font-weight: 600;">Decoração de Festas de 15 Anos em São José do Rio Preto - SP</h1>'
const darkBg = { color: 'rgb(1, 36, 14)', current: 'color' }

const s2Style = {
  '--block-padding': '16px 0 16px 0', '--m-block-padding': '16px',
  '--m-grid-template-rows': '2.50vw auto 14px',
  '--t-grid-template-rows': 'minmax(9px, auto) minmax(31px, auto) 1fr',
  '--small-desktop-grid-template-rows': 'minmax(3.76vw, auto) minmax(4.74vw, auto) 2.86vw',
  '--grid-template-rows': 'minmax(46px, auto) minmax(58px, auto) 1fr',
  '--m-grid-template-columns': '100.00%', '--grid-template-columns': '42.08% 32.68% 25.25%',
  '--m-block-min-height': 'auto', '--t-block-min-height': '54px',
  '--small-desktop-block-min-height': 'auto', '--block-min-height': '139px',
}

const s3Style = {
  '--block-padding': '16px 0 16px 0', '--m-block-padding': '16px',
  '--m-grid-template-rows': '6.67vw 109.44vw 4.44vw 109.44vw 4.44vw 109.44vw 4.44vw 109.44vw 33px',
  '--t-grid-template-rows': 'minmax(24px, auto) minmax(394px, auto) minmax(16px, auto) minmax(394px, auto) minmax(16px, auto) minmax(394px, auto) minmax(16px, auto) minmax(394px, auto) 1fr',
  '--small-desktop-grid-template-rows': 'minmax(2.70vw, auto) minmax(41.75vw, auto) minmax(41.75vw, auto) minmax(41.75vw, auto) minmax(41.75vw, auto) 0.00vw',
  '--grid-template-rows': 'minmax(33px, auto) minmax(511px, auto) minmax(511px, auto) minmax(511px, auto) minmax(511px, auto) 1fr',
  '--m-grid-template-columns': '9.45% 80.79% 9.76%', '--grid-template-columns': '12.91% 74.18% 12.91%',
  '--m-block-min-height': 'auto', '--t-block-min-height': '1681px',
  '--small-desktop-block-min-height': 'auto', '--block-min-height': '1113px',
}
</script>
