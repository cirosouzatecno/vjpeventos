<template>
  <ManagedMediaGallery v-if="showFeaturedGallery" :featured="true" title="Destaques" />
  <ManagedMediaGallery v-else-if="managedCategorySlug" :category-slug="managedCategorySlug" />
  <BlockLayout
    blockId="zRgwg5"
    htmlId="zRgwg5"
    blockClassName="block"
    innerClassName="block-layout block-layout--layout"
    :blockStyle="blockStyle"
    :background="{ color: 'rgb(10, 18, 12)', current: 'color' }"
  >
    <LayoutElement
      elementId="zWulbm"
      className="layout-element layout-element--layout"
      :style="el1Style"
      :hasRotationFrame="false"
      :hasEntranceAnimation="false"
    >
      <GridTextBox
        id="zWulbm"
        :content="contatoContent"
        textAlign="left"
        textAlignMobile="center"
      />
    </LayoutElement>

    <LayoutElement
      elementId="zim9P1"
      className="layout-element layout-element--layout"
      :style="el2Style"
      :hasRotationFrame="false"
      :hasEntranceAnimation="false"
    >
      <GridTextBox
        id="zim9P1"
        :content="enderecoContent"
        textAlign="left"
        textAlignMobile="center"
      />
    </LayoutElement>

    <LayoutElement
      elementId="zkhbUt"
      className="layout-element layout-element--layout transition transition--fade"
      :style="el3Style"
      :hasRotationFrame="false"
      :hasEntranceAnimation="true"
    >
      <GridSocialIcons
        id="zkhbUt"
        :links="igLinks"
        direction="row"
        iconSize="50px"
        spaceBetweenIcons="32px"
        iconSpacing="space-around"
        iconColor="rgb(196, 164, 74)"
        iconColorHover="rgb(200, 92, 58)"
        :preventSpacing="true"
        :fullHeight="true"
        className="layout-element__component layout-element__component--GridSocialIcons"
      />
    </LayoutElement>

    <LayoutElement
      elementId="zEIz7b"
      className="layout-element layout-element--layout"
      :style="el4Style"
      :hasRotationFrame="false"
      :hasEntranceAnimation="false"
    >
      <GridSocialIcons
        id="zEIz7b"
        :links="fbLinks"
        direction="row"
        iconSize="51px"
        spaceBetweenIcons="20px"
        iconSpacing="space-around"
        iconColor="rgb(196, 164, 74)"
        iconColorHover="rgb(200, 92, 58)"
        :preventSpacing="false"
        :fullHeight="false"
        className="layout-element__component layout-element__component--GridSocialIcons"
      />
    </LayoutElement>
  </BlockLayout>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import ManagedMediaGallery from '@/components/site/ManagedMediaGallery.vue'
import BlockLayout from '@/components/builder/layout/BlockLayout.vue'
import LayoutElement from '@/components/builder/layout/LayoutElement.vue'
import GridTextBox from '@/components/builder/elements/GridTextBox.vue'
import GridSocialIcons from '@/components/builder/elements/GridSocialIcons.vue'

const route = useRoute()
const categoryByPath = {
  '/projetos': 'projetos',
  '/corporativo': 'corporativo',
  '/festas': 'festas',
  '/batizado': 'batizado',
  '/15-anos': '15-anos',
  '/casamento': 'casamento',
  '/cerimonia': 'cerimonia',
  '/aniversario': 'aniversario',
  '/decoracao-residencial': 'decoracao-residencial',
  '/especial-natal': 'especial-natal',
}
const managedCategorySlug = computed(() => categoryByPath[route.path] || '')
const showFeaturedGallery = computed(() => route.path === '/')

const contatoContent = '<p dir="auto" class="body" style="color: rgb(242, 237, 229); --lineHeightMobile: 1.3; --fontSizeMobile: 32px;"><span style="font-weight: 700;"><strong>Contato</strong></span></p>'
const enderecoContent = '<p dir="auto" class="body" style="color: rgb(180, 162, 136);">R. Dr. Carlos Rodrigues Nogueira, 1060 - Jardim Vivendas, São José do Rio Preto - SP, 15090-415</p>'

const blockStyle = {
  '--cols': '12',
  '--rows': 10,
  '--width': '1224px',
  '--m-rows': '1',
  '--col-gap': '24px',
  '--row-gap': '16px',
  '--row-size': '48px',
  '--column-gap': '24px',
  '--block-padding': '16px 0 16px 0',
  '--m-block-padding': '40px 16px 40px 16px',
  '--m-grid-template-rows': '6.11vw auto 2.22vw auto 9.17vw 0.28vw auto 31px',
  '--t-grid-template-rows': 'minmax(22px, auto) minmax(44px, auto) minmax(8px, auto) minmax(42px, auto) minmax(33px, auto) minmax(1px, auto) minmax(50px, auto) 1fr',
  '--small-desktop-grid-template-rows': 'minmax(8.74vw, auto) minmax(1.96vw, auto) minmax(7.35vw, auto) minmax(3.92vw, auto) minmax(19.69vw, auto) minmax(4.08vw, auto) minmax(5.39vw, auto) minmax(4.17vw, auto) 0.00vw',
  '--grid-template-rows': 'minmax(107px, auto) minmax(24px, auto) minmax(90px, auto) minmax(48px, auto) minmax(241px, auto) minmax(50px, auto) minmax(66px, auto) minmax(51px, auto) 1fr',
  '--m-grid-template-columns': '2.44% 21.65% 21.34% 4.57% 26.52% 20.73% 2.74%',
  '--grid-template-columns': '6.54% 3.59% 12.75% 9.80% 16.83% 50.49%',
  '--m-block-min-height': 'auto',
  '--t-block-min-height': '231px',
  '--small-desktop-block-min-height': 'auto',
  '--block-min-height': '656px',
}

const el1Style = {
  '--text': 'left', '--align': 'flex-start', '--m-text': 'center', '--justify': 'center',
  '--m-element-margin': '0 0 24px 0', '--z-index': 1,
  '--grid-row': '2/3', '--grid-column': '1/6', '--m-grid-row': '2/3', '--m-grid-column': '1/8',
}

const el2Style = {
  '--text': 'left', '--align': 'flex-start', '--m-text': 'center', '--justify': 'center',
  '--m-element-margin': '0 0 24px 0', '--z-index': 2,
  '--grid-row': '4/5', '--grid-column': '1/5', '--m-grid-row': '4/5', '--m-grid-column': '2/7',
}

const el3Style = {
  '--icon-size': '50px', '--icon-color': 'rgb(196, 164, 74)', '--icon-spacing': 'space-around',
  '--icon-direction': 'row', '--icon-color-hover': 'rgb(200, 92, 58)',
  '--m-element-margin': '0 0 32px 0', '--space-between-icons': '32px', '--z-index': 3,
  '--grid-row': '6/7', '--grid-column': '1/3', '--m-grid-row': '7/8', '--m-grid-column': '5/6',
}

const el4Style = {
  '--align': '', '--justify': 'center', '--icon-size': '51px', '--icon-color': 'rgb(196, 164, 74)',
  '--icon-spacing': 'space-around', '--icon-direction': 'row', '--icon-color-hover': 'rgb(200, 92, 58)',
  '--m-element-margin': '0 0 16px 0', '--space-between-icons': '20px', '--z-index': 4,
  '--grid-row': '8/9', '--grid-column': '2/4', '--m-grid-row': '6/8', '--m-grid-column': '3/4',
}

const igLinks = [
  {
    href: 'https://www.instagram.com/vjproducoes.eventos/',
    label: 'instagram',
    svg: '<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="instagram-brands"><path d="M12.003 5.848A6.142 6.142 0 005.85 12a6.142 6.142 0 006.152 6.152A6.142 6.142 0 0018.155 12a6.142 6.142 0 00-6.152-6.152zm0 10.152c-2.2 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.8 4-4 4zM19.84 5.596c0 .798-.642 1.435-1.435 1.435a1.435 1.435 0 111.435-1.435zm4.075 1.457c-.091-1.922-.53-3.625-1.939-5.028C20.575.622 18.872.183 16.95.087c-1.981-.112-7.919-.112-9.9 0-1.917.091-3.62.53-5.027 1.933C.614 3.423.18 5.125.084 7.047c-.112 1.981-.112 7.92 0 9.9.091 1.922.53 3.625 1.939 5.028 1.408 1.403 3.105 1.842 5.027 1.938 1.981.112 7.919.112 9.9 0 1.922-.091 3.625-.53 5.027-1.938 1.403-1.403 1.842-3.106 1.939-5.028.112-1.98.112-7.913 0-9.894zm-2.56 12.02a4.049 4.049 0 01-2.28 2.28c-1.58.627-5.328.483-7.073.483-1.746 0-5.499.139-7.073-.482a4.05 4.05 0 01-2.281-2.281c-.626-1.58-.482-5.328-.482-7.073s-.14-5.499.482-7.073a4.05 4.05 0 012.28-2.28c1.58-.627 5.328-.483 7.074-.483 1.745 0 5.498-.139 7.073.482a4.05 4.05 0 012.28 2.281c.627 1.58.482 5.328.482 7.073s.145 5.499-.482 7.073z" fill="currentColor"></path></svg>',
  },
]

const fbLinks = [
  {
    href: 'https://www.facebook.com/',
    label: 'facebook',
    svg: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 12.0726C24 5.44354 18.629 0.0725708 12 0.0725708C5.37097 0.0725708 0 5.44354 0 12.0726C0 18.0619 4.38823 23.0264 10.125 23.9274V15.5414H7.07661V12.0726H10.125V9.4287C10.125 6.42144 11.9153 4.76031 14.6574 4.76031C15.9706 4.76031 17.3439 4.99451 17.3439 4.99451V7.94612H15.8303C14.34 7.94612 13.875 8.87128 13.875 9.82015V12.0726H17.2031L16.6708 15.5414H13.875V23.9274C19.6118 23.0264 24 18.0619 24 12.0726Z" fill="currentColor"></path></svg>',
  },
]
</script>
