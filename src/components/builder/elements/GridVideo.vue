<template>
  <div class="grid-video" :data-element-id="id" style="position:relative;width:100%;height:100%;background:#111;overflow:hidden">
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
            alt=""
            loading="lazy"
            style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block"
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
        controls
        playsinline
        style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block"
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
})

const isAutoplay = computed(() => /[?&]autoplay=1/.test(props.src || ''))
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
