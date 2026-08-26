<template>
  <div :class="rootClass" :data-element-id="id" :style="iconsStyle">
    <a
      v-for="(link, i) in links"
      :key="`${id || 'social'}-${i}`"
      :href="link.href || '#'"
      target="_blank"
      rel="noopener noreferrer"
      :title="`Ir para ${link.label}`"
      :aria-label="link.label"
      class="social-icons__link"
    >
      <span v-if="link.svg" class="social-icons__svg" v-html="link.svg" />
      <span v-else>{{ link.label }}</span>
    </a>
  </div>
</template>

<script setup>
import { computed } from 'vue'

function toPx(v, fallback = '25px') {
  if (v == null || v === '') return fallback
  return typeof v === 'number' ? `${v}px` : v
}

const props = defineProps({
  id: String,
  links: { type: Array, default: () => [] },
  direction: { type: String, default: 'row' },
  directionMobile: String,
  iconSize: [String, Number],
  iconColor: String,
  iconColorHover: String,
  spaceBetweenIcons: [String, Number],
  iconSpacing: String,
  preventSpacing: { type: Boolean, default: false },
  fullHeight: { type: Boolean, default: false },
  className: { type: String, default: '' },
  extraStyle: Object,
})

const dir = computed(() => props.direction === 'column' ? 'column' : 'row')
const dirM = computed(() => props.directionMobile === 'column' || props.directionMobile === 'row' ? props.directionMobile : dir.value)

const iconsStyle = computed(() => ({
  '--icon-direction': dir.value,
  '--m-icon-direction': dirM.value,
  '--icon-padding-vertical': dir.value === 'column' ? 'var(--space-between-icons)' : '0',
  '--icon-padding-horizontal': dir.value === 'row' ? 'var(--space-between-icons)' : '0',
  '--m-icon-padding-vertical': dirM.value === 'column' ? 'var(--space-between-icons)' : '0',
  '--m-icon-padding-horizontal': dirM.value === 'row' ? 'var(--space-between-icons)' : '0',
  ...(props.spaceBetweenIcons != null && !props.preventSpacing ? { '--space-between-icons': toPx(props.spaceBetweenIcons) } : {}),
  ...(props.preventSpacing ? { '--space-between-icons': '0px' } : {}),
  ...(props.iconSpacing ? { '--icon-spacing': props.iconSpacing } : {}),
  ...(props.iconSize != null && props.iconSize !== '' ? { '--icon-size': toPx(props.iconSize) } : {}),
  ...(props.iconColor ? { '--icon-color': props.iconColor } : {}),
  ...(props.iconColorHover ? { '--icon-color-hover': props.iconColorHover } : {}),
  ...(props.fullHeight ? { height: '100%' } : {}),
  ...props.extraStyle,
}))

const rootClass = computed(() => [
  'social-icons',
  `social-icons--${dir.value}`,
  props.className,
].filter(Boolean).join(' '))
</script>
