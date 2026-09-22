<template>
  <Page pageId="zQpKtY" locale="system" :cssVars="cssVars" :pageStyle="cssVars"
    googleFontsHref="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap"
    customFontsCss=""
  >
    <Header />
    <div class="page__blocks">
      <BlockLayout blockId="zvCXpp" htmlId="zvCXpp"
        blockClassName="block block--desktop-first-visible block--mobile-first-visible"
        innerClassName="block-layout block-layout--layout"
        :blockStyle="heroStyle" :background="heroBg" />

      <BlockLayout blockId="zZvzii" htmlId="zZvzii" blockClassName="block"
        innerClassName="block-layout block-layout--layout"
        :blockStyle="s2Style" :background="darkBg" :isFixed="true">
        <LayoutElement elementId="z1niZw" className="layout-element layout-element--layout"
          :style="{'--text':'left','--align':'flex-start','--m-text':'center','--justify':'flex-start','--m-element-margin':'0 0 16px 0','--z-index':1,'--grid-row':'2/3','--grid-column':'2/3','--m-grid-row':'2/3','--m-grid-column':'1/2'}"
          :hasRotationFrame="false" :hasEntranceAnimation="false">
          <GridTextBox id="z1niZw" :content="s2Title" textAlign="left" textAlignMobile="center" />
        </LayoutElement>
      </BlockLayout>

      <BlockLayout blockId="zxR4He" htmlId="zxR4He" blockClassName="block"
        innerClassName="block-layout block-layout--layout"
        :blockStyle="s3Style" :background="darkBg" :isFixed="true">
        <LayoutElement elementId="zGn28l" className="layout-element layout-element--layout"
          :style="{'--align':'center','--justify':'center','--m-element-margin':'0 0 16px 0','--z-index':1,'--grid-row':'2/3','--grid-column':'2/3','--m-grid-row':'2/3','--m-grid-column':'1/2'}"
          :hasRotationFrame="false" :hasEntranceAnimation="false">
          <GridVideo id="zGn28l" src="https://www.youtube.com/embed/aLMI6EK5VWo?h=null&playlist=aLMI6EK5VWo&autoplay=0&controls=1&loop=0&autopause=0&playsinline=1&mute=0" provider="youtube" jpg="https://i.ytimg.com/vi/aLMI6EK5VWo/hqdefault.jpg" webp="https://i.ytimg.com/vi_webp/aLMI6EK5VWo/hqdefault.webp" />
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

useHead({ htmlAttrs: { lang: 'pt-BR' }, title: 'Festas | VJ Eventos' })

const s2Title = '<h3 dir="auto" style="color: rgb(255, 255, 255); --lineHeightMobile: 1.3; --fontSizeMobile: 24px;">Festas</h3>'
const darkBg = { color: 'rgb(1, 36, 14)', current: 'color' }

const s2Style = {
  '--block-padding': '16px 0 16px 0', '--m-block-padding': '16px',
  '--m-grid-template-rows': '2.50vw auto 0px',
  '--t-grid-template-rows': 'minmax(9px, auto) minmax(31px, auto) 1fr',
  '--small-desktop-grid-template-rows': 'minmax(3.27vw, auto) minmax(4.74vw, auto) 2.53vw',
  '--grid-template-rows': 'minmax(40px, auto) minmax(58px, auto) 1fr',
  '--m-grid-template-columns': '100.00%', '--grid-template-columns': '42.08% 32.68% 25.25%',
  '--m-block-min-height': 'auto', '--t-block-min-height': '40px',
  '--small-desktop-block-min-height': 'auto', '--block-min-height': '129px',
}

const s3Style = {
  '--block-padding': '16px 0 16px 0', '--m-block-padding': '16px',
  '--m-grid-template-rows': '8.06vw 155.83vw 81px',
  '--t-grid-template-rows': 'minmax(29px, auto) minmax(561px, auto) 1fr',
  '--small-desktop-grid-template-rows': 'minmax(4.08vw, auto) minmax(38.15vw, auto) 48.69vw',
  '--grid-template-rows': 'minmax(50px, auto) minmax(467px, auto) 1fr',
  '--m-grid-template-columns': '100.00%', '--grid-template-columns': '15.28% 67.89% 16.83%',
  '--m-block-min-height': 'auto', '--t-block-min-height': '671px',
  '--small-desktop-block-min-height': 'auto', '--block-min-height': '1113px',
}
</script>
