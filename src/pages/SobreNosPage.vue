<template>
  <Page pageId="zURXh5" locale="system" :cssVars="cssVars" :pageStyle="cssVars"
    googleFontsHref="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap"
    customFontsCss=""
  >
    <Header />
    <div class="page__blocks">
      <BlockLayout blockId="zWimpV" htmlId="zWimpV"
        blockClassName="block block--desktop-first-visible block--mobile-first-visible"
        innerClassName="block-layout block-layout--layout"
        :blockStyle="heroStyle" :background="heroBg" />

      <BlockLayout blockId="z4tMzL" htmlId="z4tMzL" blockClassName="block"
        innerClassName="block-layout block-layout--layout"
        :blockStyle="s2Style" :background="darkBg" :isFixed="true">
        <LayoutElement elementId="zdaxdA" className="layout-element layout-element--layout"
          :style="{'--text':'left','--align':'flex-start','--m-text':'center','--justify':'flex-start','--m-element-margin':'0 0 16px 0','--z-index':1,'--grid-row':'2/3','--grid-column':'2/3','--m-grid-row':'2/3','--m-grid-column':'1/2'}"
          :hasRotationFrame="false" :hasEntranceAnimation="false">
          <GridTextBox id="zdaxdA" :content="s2Title" textAlign="left" textAlignMobile="center" />
        </LayoutElement>
      </BlockLayout>

      <BlockLayout blockId="zrNEMM" htmlId="zrNEMM" blockClassName="block"
        innerClassName="block-layout block-layout--layout"
        :blockStyle="s3Style" :background="darkBg" :isFixed="true" />

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
import { cssVars, heroBg, heroStyle } from './shared/pageCommons.js'

useHead({ htmlAttrs: { lang: 'pt-BR' }, title: 'Le Jardin Eventos' })

const s2Title = '<h3 dir="auto" style="color: rgb(255, 255, 255); --lineHeightMobile: 1.3; --fontSizeMobile: 24px;">Sobre Nós</h3>'
const darkBg = { color: 'rgb(1, 36, 14)', current: 'color' }

const s2Style = {
  '--block-padding': '16px 0 16px 0', '--m-block-padding': '16px',
  '--m-grid-template-rows': '13.61vw auto 55px',
  '--t-grid-template-rows': 'minmax(49px, auto) minmax(31px, auto) 1fr',
  '--small-desktop-grid-template-rows': 'minmax(3.76vw, auto) minmax(4.74vw, auto) 2.45vw',
  '--grid-template-rows': 'minmax(46px, auto) minmax(58px, auto) 1fr',
  '--m-grid-template-columns': '100.00%', '--grid-template-columns': '42.08% 32.68% 25.25%',
  '--m-block-min-height': 'auto', '--t-block-min-height': '135px',
  '--small-desktop-block-min-height': 'auto', '--block-min-height': '134px',
}

const s3Style = {
  '--block-padding': '16px 0 16px 0', '--m-block-padding': '16px',
  '--m-grid-template-rows': ' 1fr', '--t-grid-template-rows': ' 1fr',
  '--small-desktop-grid-template-rows': ' 1fr', '--grid-template-rows': ' 1fr',
  '--m-grid-template-columns': '100.00%', '--grid-template-columns': '100.00%',
  '--m-block-min-height': '399px', '--t-block-min-height': '399px',
  '--small-desktop-block-min-height': '90.93137254901961vw', '--block-min-height': '1113px',
}
</script>
