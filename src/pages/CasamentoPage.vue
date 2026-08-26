<template>
  <Page pageId="zst8-W" locale="system" :cssVars="cssVars" :pageStyle="cssVars"
    googleFontsHref="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap"
    customFontsCss=""
  >
    <Header />
    <div class="page__blocks">
      <BlockLayout blockId="zTrmFN" htmlId="zTrmFN"
        blockClassName="block block--desktop-first-visible block--mobile-first-visible"
        innerClassName="block-layout block-layout--layout"
        :blockStyle="heroStyle" :background="heroBg" />

      <BlockLayout blockId="zq6CTL" htmlId="zq6CTL" blockClassName="block"
        innerClassName="block-layout block-layout--layout"
        :blockStyle="s2Style" :background="darkBg" :isFixed="true">
        <LayoutElement elementId="zi1iCz" className="layout-element layout-element--layout"
          :style="{'--text':'left','--align':'flex-start','--m-text':'center','--justify':'flex-start','--m-element-margin':'0 0 16px 0','--z-index':1,'--grid-row':'2/3','--grid-column':'2/3','--m-grid-row':'2/3','--m-grid-column':'1/2'}"
          :hasRotationFrame="false" :hasEntranceAnimation="false">
          <GridTextBox id="zi1iCz" :content="s2Title" textAlign="left" textAlignMobile="center" />
        </LayoutElement>
      </BlockLayout>

      <BlockLayout blockId="zYOmnw" htmlId="zYOmnw" blockClassName="block"
        innerClassName="block-layout block-layout--layout"
        :blockStyle="s3Style" :background="darkBg" :isFixed="true">
        <LayoutElement elementId="z-ZRbk" className="layout-element layout-element--layout"
          :style="{'--align':'center','--justify':'center','--m-element-margin':'0 0 16px 0','--z-index':1,'--grid-row':'2/3','--grid-column':'2/3','--m-grid-row':'2/3','--m-grid-column':'1/2'}"
          :hasRotationFrame="false" :hasEntranceAnimation="false">
          <GridVideo id="z-ZRbk" src="https://www.youtube.com/embed/GHdQmejdlc0?h=null&playlist=GHdQmejdlc0&autoplay=0&controls=1&loop=0&autopause=0&playsinline=1&mute=0" provider="youtube" jpg="https://i.ytimg.com/vi/GHdQmejdlc0/hqdefault.jpg" webp="https://i.ytimg.com/vi_webp/GHdQmejdlc0/hqdefault.webp" />
        </LayoutElement>
        <LayoutElement elementId="zmUPRx" className="layout-element layout-element--layout"
          :style="{'--align':'center','--justify':'center','--m-element-margin':'0 0 16px 0','--z-index':2,'--grid-row':'3/4','--grid-column':'2/3','--m-grid-row':'4/5','--m-grid-column':'1/2'}"
          :hasRotationFrame="false" :hasEntranceAnimation="false">
          <GridVideo id="zmUPRx" src="https://www.youtube.com/embed/AwAIUZ8kw88?h=null&playlist=AwAIUZ8kw88&autoplay=0&controls=1&loop=0&autopause=0&playsinline=1&mute=0" provider="youtube" jpg="https://i.ytimg.com/vi/AwAIUZ8kw88/hqdefault.jpg" webp="https://i.ytimg.com/vi_webp/AwAIUZ8kw88/hqdefault.webp" />
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

const s2Title = '<h3 dir="auto" style="color: rgb(255, 255, 255); --lineHeightMobile: 1.3; --fontSizeMobile: 24px;">Casamentos</h3>'
const darkBg = { color: 'rgb(1, 36, 14)', current: 'color' }

const s2Style = {
  '--block-padding': '16px 0 16px 0', '--m-block-padding': '16px',
  '--m-grid-template-rows': '2.50vw auto 8px',
  '--t-grid-template-rows': 'minmax(9px, auto) minmax(31px, auto) 1fr',
  '--small-desktop-grid-template-rows': 'minmax(3.76vw, auto) minmax(4.74vw, auto) 2.86vw',
  '--grid-template-rows': 'minmax(46px, auto) minmax(58px, auto) 1fr',
  '--m-grid-template-columns': '100.00%', '--grid-template-columns': '42.08% 32.68% 25.25%',
  '--m-block-min-height': 'auto', '--t-block-min-height': '48px',
  '--small-desktop-block-min-height': 'auto', '--block-min-height': '139px',
}

const s3Style = {
  '--block-padding': '16px 0 16px 0', '--m-block-padding': '16px',
  '--m-grid-template-rows': '6.67vw 75.00vw 4.44vw 131.67vw 54px',
  '--t-grid-template-rows': 'minmax(24px, auto) minmax(270px, auto) minmax(16px, auto) minmax(474px, auto) 1fr',
  '--small-desktop-grid-template-rows': 'minmax(3.27vw, auto) minmax(42.08vw, auto) minmax(42.08vw, auto) 3.51vw',
  '--grid-template-rows': 'minmax(40px, auto) minmax(515px, auto) minmax(515px, auto) 1fr',
  '--m-grid-template-columns': '100.00%', '--grid-template-columns': '12.58% 74.75% 12.66%',
  '--m-block-min-height': 'auto', '--t-block-min-height': '838px',
  '--small-desktop-block-min-height': 'auto', '--block-min-height': '1113px',
}
</script>
