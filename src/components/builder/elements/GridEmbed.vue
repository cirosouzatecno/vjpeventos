<template>
  <div class="grid-embed" :data-element-id="id" :style="embedStyle">
    <iframe
      v-if="content"
      title="Custom embed"
      :srcdoc="srcdoc"
      sandbox="allow-scripts allow-forms allow-popups allow-same-origin"
      style="width:100%;height:100%;border:0;display:block"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  id: String,
  content: { type: String, default: '' },
  initialHeight: [String, Number],
  initialHeightMobile: [String, Number],
})

function toCssH(v) {
  if (v == null || v === '') return undefined
  return typeof v === 'number' ? `${v}px` : v
}

const embedStyle = computed(() => ({
  '--embed-height': toCssH(props.initialHeight),
  '--m-embed-height': toCssH(props.initialHeightMobile),
}))

const srcdoc = computed(() => {
  const html = props.content || ''
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>html{overflow:hidden}*{margin:0;padding:0;box-sizing:border-box}iframe{max-width:100%}</style></head><body>${html}</body></html>`
})
</script>
