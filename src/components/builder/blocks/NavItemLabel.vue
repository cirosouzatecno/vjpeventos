<template>
  <SmartLink
    v-if="hasHref"
    :class="linkClass"
    :href="href"
    :target="item?.target"
    :rel="item?.rel"
    :aria-current="isActive ? 'page' : undefined"
    :aria-haspopup="item?.hasDropdown ? 'true' : undefined"
  >
    <span class="block-navigation__link-text">{{ label }}</span>
    <svg v-if="item?.hasDropdown" class="block-navigation__chevron" width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" focusable="false">
      <path d="M2.5 4.5L6 8l3.5-3.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  </SmartLink>
  <span
    v-else
    :class="linkClass"
    :aria-haspopup="item?.hasDropdown ? 'true' : undefined"
  >
    <span class="block-navigation__link-text">{{ label }}</span>
    <svg v-if="item?.hasDropdown" class="block-navigation__chevron" width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" focusable="false">
      <path d="M2.5 4.5L6 8l3.5-3.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  </span>
</template>

<script setup>
import { computed } from 'vue'
import SmartLink from '../SmartLink.vue'

const props = defineProps({
  item: Object,
  activePath: { type: String, default: '/' },
})

function normalizePath(path) {
  if (!path || path === '/') return '/'
  return path.endsWith('/') ? path.slice(0, -1) : path
}

const label = computed(() => props.item?.text || '')
const href = computed(() => props.item?.href || '')
const hasHref = computed(() => Boolean(href.value))
const isActive = computed(() => hasHref.value && normalizePath(href.value) === props.activePath)

const linkClass = computed(() => [
  'block-navigation__link',
  isActive.value ? 'block-navigation__link--active' : '',
  props.item?.hasDropdown ? 'block-navigation__link--has-dropdown' : '',
].filter(Boolean).join(' '))
</script>
