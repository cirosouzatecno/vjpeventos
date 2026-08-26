<template>
  <main class="page" :style="pageStyle" :data-page-id="pageId" :data-locale="locale">
    <component :is="'style'" v-if="rootCssVars" data-builder-page-vars="true">{{ rootCssVars }}</component>
    <SiteFonts :googleFontsHref="googleFontsHref" :customFontsCss="customFontsCss" />
    <slot />
  </main>
</template>

<script setup>
import { computed } from 'vue'
import SiteFonts from './SiteFonts.vue'

const props = defineProps({
  pageId: String,
  locale: String,
  cssVars: { type: Object, default: () => ({}) },
  pageStyle: Object,
  googleFontsHref: String,
  customFontsCss: String,
})

const rootCssVars = computed(() => {
  const vars = props.cssVars
  if (!vars || typeof vars !== 'object') return ''
  const entries = Object.entries(vars).filter(([, v]) => v !== undefined && v !== null && v !== '')
  if (!entries.length) return ''
  return `:root {\n${entries.map(([k, v]) => `\t${k}: ${v};`).join('\n')}\n}`
})
</script>
