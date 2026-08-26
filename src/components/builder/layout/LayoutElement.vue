<template>
  <div ref="rootRef" :class="className" :style="style" :data-element-id="elementId">
    <div v-if="hasRotationFrame" class="layout-element__rotation-frame">
      <slot />
    </div>
    <slot v-else />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  elementId: String,
  className: String,
  style: Object,
  hasRotationFrame: { type: Boolean, default: false },
  hasEntranceAnimation: { type: Boolean, default: false },
})

const rootRef = ref(null)
let observer = null

onMounted(() => {
  if (!props.hasEntranceAnimation || typeof IntersectionObserver === 'undefined') return
  const root = rootRef.value
  if (!root) return

  const isRootHidden = props.className?.includes('transition--root-hidden')
  const targets = isRootHidden
    ? [
        ...root.querySelectorAll('[data-animation-role="image"]'),
        ...root.querySelectorAll('[data-animation-role="block-element"]'),
      ]
    : [root]

  if (!targets.length) return

  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        entry.target.removeAttribute('data-animation-state')
        return
      }
      observer.unobserve(entry.target)
      entry.target.setAttribute('data-animation-state', 'active')
    })
  }, { threshold: 0 })

  targets.forEach((target) => observer.observe(target))
})

onUnmounted(() => {
  if (observer) observer.disconnect()
})
</script>
