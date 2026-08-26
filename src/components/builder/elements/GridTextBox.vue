<template>
  <div class="text-box" :data-element-id="id" :style="boxStyle" v-html="content || ''" />
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  id: String,
  content: { type: String, default: '' },
  textAlign: String,
  textAlignMobile: String,
  backgroundColor: String,
})

const boxStyle = computed(() => {
  const align = props.textAlign
  const alignM = props.textAlignMobile || align
  const ws = align === 'justify' ? 'normal' : 'break-spaces'
  const wsM = alignM === 'justify' ? 'normal' : 'break-spaces'
  return {
    '--white-space': ws,
    '--white-space-mobile': wsM,
    backgroundColor: props.backgroundColor || undefined,
    textAlign: align || undefined,
  }
})
</script>
