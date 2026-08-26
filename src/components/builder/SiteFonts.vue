<template></template>

<script setup>
import { onMounted, onUnmounted, watch } from 'vue'

const props = defineProps({
  googleFontsHref: String,
  customFontsCss: String,
})

let fontLink = null
let fontStyle = null

function updateGoogleFonts(href) {
  if (!href) return
  const existing = document.querySelector('link[data-builder-fonts="google"]')
  if (existing) {
    existing.setAttribute('href', href)
    return
  }
  fontLink = document.createElement('link')
  fontLink.rel = 'stylesheet'
  fontLink.href = href
  fontLink.setAttribute('data-builder-fonts', 'google')
  document.head.appendChild(fontLink)
}

function updateCustomFonts(css) {
  if (!css) return
  if (fontStyle) fontStyle.remove()
  fontStyle = document.createElement('style')
  fontStyle.setAttribute('data-builder-fonts', 'custom')
  fontStyle.textContent = css
  document.head.appendChild(fontStyle)
}

onMounted(() => {
  updateGoogleFonts(props.googleFontsHref)
  updateCustomFonts(props.customFontsCss)
})

onUnmounted(() => {
  if (fontLink) fontLink.remove()
  if (fontStyle) fontStyle.remove()
})

watch(() => props.googleFontsHref, updateGoogleFonts)
watch(() => props.customFontsCss, updateCustomFonts)
</script>
