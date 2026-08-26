<template>
  <Page pageId="z95MoS" locale="system" :cssVars="cssVars" :pageStyle="cssVars"
    googleFontsHref="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap"
    customFontsCss=""
  >
    <Header />
    <div class="page__blocks">
      <BlockLayout blockId="zCsrpX" htmlId="zCsrpX"
        blockClassName="block block--desktop-first-visible block--mobile-first-visible"
        innerClassName="block-layout block-layout--layout"
        :blockStyle="heroStyle" :background="heroBg" />

      <BlockLayout blockId="z6-Kdp" htmlId="z6-Kdp" blockClassName="block"
        innerClassName="block-layout block-layout--layout"
        :blockStyle="s2Style" :background="darkBg" :isFixed="true">
        <LayoutElement elementId="zDweSA" className="layout-element layout-element--layout"
          :style="{'--text':'left','--align':'flex-start','--m-text':'center','--justify':'flex-start','--m-element-margin':'0 0 16px 0','--z-index':1,'--grid-row':'2/3','--grid-column':'2/3','--m-grid-row':'2/3','--m-grid-column':'1/2'}"
          :hasRotationFrame="false" :hasEntranceAnimation="false">
          <GridTextBox id="zDweSA" :content="s2Title" textAlign="left" textAlignMobile="center" />
        </LayoutElement>
      </BlockLayout>

      <BlockLayout blockId="zoVwxy" htmlId="zoVwxy" blockClassName="block"
        innerClassName="block-layout block-layout--layout"
        :blockStyle="s3Style" :background="darkBg" :isFixed="true">
        <LayoutElement elementId="zCN8JA" className="layout-element layout-element--layout"
          :style="{'--align':'center','--justify':'center','--m-element-margin':'0 0 16px 0','--z-index':1,'--grid-row':'2/3','--grid-column':'2/3','--m-grid-row':'4/5','--m-grid-column':'3/4'}"
          :hasRotationFrame="false" :hasEntranceAnimation="false">
          <GridVideo id="zCN8JA" src="https://www.youtube.com/embed/ajECYFgRKGI?h=null&playlist=ajECYFgRKGI&autoplay=0&controls=1&loop=0&autopause=0&playsinline=1&mute=0" provider="youtube" jpg="https://i.ytimg.com/vi/ajECYFgRKGI/hqdefault.jpg" webp="https://i.ytimg.com/vi_webp/ajECYFgRKGI/hqdefault.webp" />
        </LayoutElement>
        <LayoutElement elementId="zQYGif" className="layout-element layout-element--layout"
          :style="{'--align':'center','--justify':'center','--m-element-margin':'0 0 16px 0','--z-index':2,'--grid-row':'3/4','--grid-column':'2/3','--m-grid-row':'6/7','--m-grid-column':'2/5'}"
          :hasRotationFrame="false" :hasEntranceAnimation="false">
          <GridVideo id="zQYGif" src="https://www.youtube.com/embed/WmZMLeSeleo?h=null&playlist=WmZMLeSeleo&autoplay=0&controls=1&loop=0&autopause=0&playsinline=1&mute=0" provider="youtube" jpg="https://i.ytimg.com/vi/WmZMLeSeleo/hqdefault.jpg" webp="https://i.ytimg.com/vi_webp/WmZMLeSeleo/hqdefault.webp" />
        </LayoutElement>
        <LayoutElement elementId="zSN1JY" className="layout-element layout-element--layout"
          :style="{'--align':'center','--justify':'center','--m-element-margin':'0 0 16px 0','--z-index':3,'--grid-row':'4/5','--grid-column':'2/3','--m-grid-row':'2/3','--m-grid-column':'3/4'}"
          :hasRotationFrame="false" :hasEntranceAnimation="false">
          <GridVideo id="zSN1JY" src="https://www.youtube.com/embed/UhFUI6uWPKU?h=null&playlist=UhFUI6uWPKU&autoplay=0&controls=1&loop=0&autopause=0&playsinline=1&mute=0" provider="youtube" jpg="https://i.ytimg.com/vi/UhFUI6uWPKU/hqdefault.jpg" webp="https://i.ytimg.com/vi_webp/UhFUI6uWPKU/hqdefault.webp" />
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

useHead({ htmlAttrs: { lang: 'pt-BR' }, title: 'Le Jardin Eventos' })

const s2Title = '<h3 dir="auto" style="color: rgb(255, 255, 255); --lineHeightMobile: 1.3; --fontSizeMobile: 24px;">Decoração Residencial</h3>'
const darkBg = { color: 'rgb(1, 36, 14)', current: 'color' }

const s2Style = {
  '--block-padding': '16px 0 16px 0', '--m-block-padding': '16px',
  '--m-grid-template-rows': '6.67vw auto 14px',
  '--t-grid-template-rows': 'minmax(24px, auto) minmax(31px, auto) 1fr',
  '--small-desktop-grid-template-rows': 'minmax(3.76vw, auto) minmax(9.40vw, auto) 0.00vw',
  '--grid-template-rows': 'minmax(46px, auto) minmax(115px, auto) 1fr',
  '--m-grid-template-columns': '100.00%', '--grid-template-columns': '42.08% 32.68% 25.25%',
  '--m-block-min-height': 'auto', '--t-block-min-height': '69px',
  '--small-desktop-block-min-height': 'auto', '--block-min-height': '148px',
}

const s3Style = {
  '--block-padding': '16px 0 16px 0', '--m-block-padding': '16px',
  '--m-grid-template-rows': '3.06vw 114.72vw 4.44vw 114.72vw 3.06vw 65.56vw 269px',
  '--t-grid-template-rows': 'minmax(11px, auto) minmax(413px, auto) minmax(16px, auto) minmax(413px, auto) minmax(11px, auto) minmax(236px, auto) 1fr',
  '--small-desktop-grid-template-rows': 'minmax(4.25vw, auto) minmax(40.20vw, auto) minmax(40.20vw, auto) minmax(40.20vw, auto) 0.00vw',
  '--grid-template-rows': 'minmax(52px, auto) minmax(492px, auto) minmax(492px, auto) minmax(492px, auto) 1fr',
  '--m-grid-template-columns': '9.15% 5.49% 70.43% 5.49% 9.45%', '--grid-template-columns': '14.22% 71.57% 14.22%',
  '--m-block-min-height': 'auto', '--t-block-min-height': '1369px',
  '--small-desktop-block-min-height': 'auto', '--block-min-height': '1113px',
}
</script>
