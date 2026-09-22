<template>
  <div
    class="grid-video"
    :data-element-id="id"
    :class="{ 'grid-video--playing': isPlaying, 'grid-video--frameless': frameless }"
  >
    <template v-if="src">
      <template v-if="useIframe">
        <iframe
          v-if="isPlaying || !jpg"
          title="Video"
          :src="src"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          style="position:absolute;inset:0;width:100%;height:100%;border:0;display:block"
        />
        <template v-else>
          <img
            :src="jpg"
            :alt="'Capa do vídeo'"
            loading="lazy"
            class="grid-video__poster"
          />
          <button
            type="button"
            aria-label="Play video"
            @click="isPlaying = true"
            style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:68px;height:48px;border:0;border-radius:8px;background:rgba(30,30,30,0.85);cursor:pointer;color:#fff;font-size:20px"
          >▶</button>
        </template>
      </template>
      <video
        v-else
        :src="src"
        :poster="jpg || undefined"
        :controls="controls"
        :autoplay="autoplay"
        :muted="muted"
        :loop="loop"
        :preload="autoplay ? 'auto' : 'metadata'"
        playsinline
        :style="{ objectFit: fit }"
      />
    </template>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  id: String,
  src: { type: String, default: '' },
  provider: { type: String, default: 'youtube' },
  jpg: { type: String, default: '' },
  webp: { type: String, default: '' },
  autoplay: { type: Boolean, default: false },
  muted: { type: Boolean, default: false },
  loop: { type: Boolean, default: false },
  controls: { type: Boolean, default: true },
  fit: { type: String, default: 'cover' },
  frameless: { type: Boolean, default: false },
})

const isAutoplay = computed(() => props.autoplay || /[?&]autoplay=1/.test(props.src || ''))
const isPlaying = ref(isAutoplay.value)

const useIframe = computed(() => {
  const s = props.src || ''
  return (
    props.provider === 'youtube' ||
    props.provider === 'vimeo' ||
    /youtube\.com\/embed|youtu\.be|vimeo\.com\/video|player\.vimeo\.com|\/embed\//i.test(s)
  )
})
</script>

<style scoped>
.grid-video{position:relative;width:100%;height:100%;min-height:220px;background:#111;overflow:hidden;border-radius:2px;box-shadow:0 18px 50px rgba(0,0,0,.18)}
.grid-video::after{content:'';position:absolute;inset:0;border:1px solid rgba(255,255,255,.16);pointer-events:none}
.grid-video--frameless{background:transparent;border-radius:0;box-shadow:none}
.grid-video--frameless::after{display:none}
.grid-video iframe,.grid-video video{position:absolute;inset:0;width:100%;height:100%;border:0;display:block}
.grid-video__poster{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;transition:transform .7s ease,filter .7s ease;filter:saturate(.84)}
.grid-video:hover .grid-video__poster{transform:scale(1.035);filter:saturate(1)}
.grid-video button{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:64px;height:48px;border:1px solid rgba(255,255,255,.55);border-radius:50%;background:rgba(23,55,42,.86);cursor:pointer;color:#fff;font-size:18px;transition:transform .25s ease,background .25s ease}
.grid-video button:hover{transform:translate(-50%,-50%) scale(1.08);background:#ad7e39}
</style>
