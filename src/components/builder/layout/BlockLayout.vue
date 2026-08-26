<template>
  <section :id="htmlId || blockId" :class="blockClassName" :style="blockStyle" :data-block-id="blockId">
    <BlockBackground
      v-if="background && (background.src || background.url || background.color || background.type)"
      :background="background"
      :isFixed="isFixed"
      :backgroundImagePosition="backgroundImagePosition"
    />
    <div :class="innerClassName">
      <slot />
    </div>
  </section>
</template>

<script setup>
import BlockBackground from '../blocks/BlockBackground.vue'

defineProps({
  blockId: String,
  htmlId: String,
  innerClassName: { type: String, default: 'block-layout block-layout--layout' },
  blockClassName: { type: String, default: 'block' },
  blockStyle: Object,
  background: Object,
  isFixed: { type: Boolean, default: false },
  backgroundImagePosition: { type: [Number, String], default: 'center' },
})
</script>
