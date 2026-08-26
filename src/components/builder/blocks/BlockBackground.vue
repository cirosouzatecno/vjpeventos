<template>
  <div
    :class="['block-background', isFixed ? 'block-background--fixed' : '']"
    :style="background.color ? { background: background.color } : {}"
  >
    <img
      v-if="isImage && mediaSrc"
      :class="['block-background__media', isFixed ? 'block-background__media--fixed' : '']"
      :src="mediaSrc"
      :srcset="background.srcset || undefined"
      :sizes="background.srcset ? '100vw' : undefined"
      :alt="background.alt || ''"
      :loading="isFixed ? 'eager' : 'lazy'"
      :style="{ objectPosition: objectPosition }"
    />
    <video
      v-if="isVideo && mediaSrc"
      :class="['block-background__media', isFixed ? 'block-background__media--fixed' : '']"
      :src="mediaSrc"
      :poster="background.poster || undefined"
      autoplay
      muted
      loop
      playsinline
    />
    <div
      v-if="showOverlay"
      class="block-background__overlay"
      :style="{ opacity: background['overlay-opacity'] ?? background.overlayOpacity }"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { getObjectPositionCssValue } from './backgroundPosition.js'

const props = defineProps({
  background: { type: Object, default: () => ({}) },
  isFixed: { type: Boolean, default: false },
  backgroundImagePosition: { type: [Number, String], default: 'center' },
})

const type = computed(() => props.background?.type || '')
const isImage = computed(() => type.value === 'image' || (type.value === '' && !!props.background?.src))
const isVideo = computed(() => type.value === 'video')
const mediaSrc = computed(() => props.background?.src || props.background?.url || '')
const objectPosition = computed(() => getObjectPositionCssValue(props.backgroundImagePosition))
const showOverlay = computed(() => {
  const op = props.background?.['overlay-opacity'] ?? props.background?.overlayOpacity
  return op != null && op > 0
})
</script>
