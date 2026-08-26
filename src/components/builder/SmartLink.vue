<template>
  <RouterLink v-if="isInternal" :to="destination" v-bind="attrs"><slot /></RouterLink>
  <a v-else :href="destination" :target="target" :rel="rel" v-bind="attrs"><slot /></a>
</template>

<script setup>
import { computed, useAttrs } from 'vue'
import { RouterLink } from 'vue-router'

defineOptions({ inheritAttrs: false })

const props = defineProps({
  href: { type: String, default: '#' },
  to: { type: String, default: null },
  target: String,
  rel: String,
})

const attrs = useAttrs()
const destination = computed(() => props.to ?? props.href)
const isInternal = computed(() => {
  const d = destination.value
  const inNewTab = Boolean(props.target) && props.target !== '_self'
  if (inNewTab || !d || typeof d !== 'string') return false
  if (d.startsWith('//') || d.startsWith('http') || d.startsWith('mailto:') || d.startsWith('tel:')) return false
  return d.startsWith('/')
})
</script>
