<template>
  <Page pageId="zyPccq" locale="system" :cssVars="cssVars" :pageStyle="cssVars"
    googleFontsHref="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap"
    customFontsCss=""
  >
    <Header />
    <div class="page__blocks">
      <BlockLayout blockId="zMvjG-" htmlId="zMvjG-"
        blockClassName="block block--desktop-first-visible block--mobile-first-visible"
        innerClassName="block-layout block-layout--layout"
        :blockStyle="heroStyle" :background="heroBg" />

      <BlockLayout blockId="zXa2w3" htmlId="zXa2w3" blockClassName="block"
        innerClassName="block-layout block-layout--layout"
        :blockStyle="s2Style" :background="darkBg" :isFixed="true">
        <LayoutElement elementId="z7e4Hg" className="layout-element layout-element--layout"
          :style="{'--text':'left','--align':'flex-start','--m-text':'center','--justify':'flex-start','--m-element-margin':'0 0 16px 0','--z-index':1,'--grid-row':'2/3','--grid-column':'2/3','--m-grid-row':'2/3','--m-grid-column':'1/2'}"
          :hasRotationFrame="false" :hasEntranceAnimation="false">
          <GridTextBox id="z7e4Hg" :content="s2Title" textAlign="left" textAlignMobile="center" />
        </LayoutElement>
      </BlockLayout>

      <BlockLayout blockId="zFOotl" htmlId="zFOotl" blockClassName="block"
        innerClassName="block-layout block-layout--layout"
        :blockStyle="s3Style" :background="darkBg" :isFixed="true">
        <LayoutElement elementId="zURWua" className="layout-element layout-element--layout"
          :style="{'--align':'center','--justify':'center','--m-element-margin':'0 0 16px 0','--z-index':1,'--grid-row':'2/3','--grid-column':'2/3','--m-grid-row':'1/2','--m-grid-column':'2/3'}"
          :hasRotationFrame="false" :hasEntranceAnimation="false">
          <GridVideo id="zURWua" src="https://www.youtube.com/embed/AfGe1AzH7ZA?h=null&playlist=AfGe1AzH7ZA&autoplay=0&controls=1&loop=0&autopause=0&playsinline=1&mute=0" provider="youtube" jpg="https://i.ytimg.com/vi/AfGe1AzH7ZA/hqdefault.jpg" webp="https://i.ytimg.com/vi_webp/AfGe1AzH7ZA/hqdefault.webp" />
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

const s2Title = '<h3 dir="auto" style="color: rgb(255, 255, 255); --lineHeightMobile: 1.3; --fontSizeMobile: 24px;">Aniversarios</h3>'
const darkBg = { color: 'rgb(1, 36, 14)', current: 'color' }

const s2Style = {
  '--block-padding': '16px 0 16px 0', '--m-block-padding': '16px',
  '--m-grid-template-rows': '13.61vw auto 48px',
  '--t-grid-template-rows': 'minmax(49px, auto) minmax(31px, auto) 1fr',
  '--small-desktop-grid-template-rows': 'minmax(3.76vw, auto) minmax(4.74vw, auto) 3.59vw',
  '--grid-template-rows': 'minmax(46px, auto) minmax(58px, auto) 1fr',
  '--m-grid-template-columns': '100.00%', '--grid-template-columns': '42.08% 32.68% 25.25%',
  '--m-block-min-height': 'auto', '--t-block-min-height': '128px',
  '--small-desktop-block-min-height': 'auto', '--block-min-height': '148px',
}

const s3Style = {
  '--block-padding': '16px 0 16px 0', '--m-block-padding': '16px',
  '--m-grid-template-rows': '114.72vw 16px',
  '--t-grid-template-rows': 'minmax(413px, auto) 1fr',
  '--small-desktop-grid-template-rows': 'minmax(4.25vw, auto) minmax(40.20vw, auto) 46.49vw',
  '--grid-template-rows': 'minmax(52px, auto) minmax(492px, auto) 1fr',
  '--m-grid-template-columns': '14.63% 70.43% 14.94%', '--grid-template-columns': '14.22% 71.57% 14.22%',
  '--m-block-min-height': 'auto', '--t-block-min-height': '429px',
  '--small-desktop-block-min-height': 'auto', '--block-min-height': '1113px',
}
</script>
