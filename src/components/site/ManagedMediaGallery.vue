<template>
  <section v-if="items.length" class="managed-gallery" :aria-label="sectionTitle">
    <div class="managed-gallery__inner">
      <header class="managed-gallery__header">
        <div>
          <p class="managed-gallery__eyebrow">{{ featured ? 'Seleção' : 'Galeria' }}</p>
          <h2>{{ sectionTitle }}</h2>
        </div>
        <p class="managed-gallery__count">{{ items.length }} {{ items.length === 1 ? 'item' : 'itens' }}</p>
      </header>

      <div class="managed-gallery__grid">
        <article
          v-for="item in items"
          :key="item.id"
          class="managed-card"
          :class="{ 'managed-card--featured': item.featured }"
        >
          <button
            v-if="mediaType(item) === 'image'"
            type="button"
            class="managed-card__media managed-card__media--button"
            @click="openLightbox(item)"
          >
            <img :src="item.image_url" :alt="item.alt_text || item.title || sectionTitle" loading="lazy" />
            <span class="managed-card__zoom" aria-hidden="true">＋</span>
          </button>

          <div v-else-if="mediaType(item) === 'youtube'" class="managed-card__media managed-card__video">
            <iframe
              :src="youtubeEmbed(item.youtube_id)"
              :title="item.title || 'Vídeo'"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            />
          </div>

          <div v-else class="managed-card__media managed-card__video">
            <video :src="item.image_url" controls preload="metadata" playsinline />
          </div>

          <div v-if="item.title || item.caption" class="managed-card__caption">
            <strong v-if="item.title">{{ item.title }}</strong>
            <p v-if="item.caption">{{ item.caption }}</p>
          </div>
        </article>
      </div>
    </div>

    <div
      v-if="activeImage"
      class="managed-lightbox"
      role="dialog"
      aria-modal="true"
      :aria-label="'Imagem ampliada: ' + (activeImage.alt_text || activeImage.title || '')"
      @click.self="closeLightbox"
      @keydown.esc="closeLightbox"
    >
      <button type="button" class="managed-lightbox__close" aria-label="Fechar" @click="closeLightbox">×</button>
      <figure>
        <img :src="activeImage.image_url" :alt="activeImage.alt_text || activeImage.title || sectionTitle" />
        <figcaption v-if="activeImage.title || activeImage.caption">
          <strong v-if="activeImage.title">{{ activeImage.title }}</strong>
          <span v-if="activeImage.caption">{{ activeImage.caption }}</span>
        </figcaption>
      </figure>
    </div>
  </section>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { supabase } from '@/lib/supabase.js'

const props = defineProps({
  categorySlug: { type: String, default: '' },
  featured: { type: Boolean, default: false },
  title: { type: String, default: '' },
})

const items = ref([])
const categoryName = ref('')
const activeImage = ref(null)

const sectionTitle = computed(() => props.title || (props.featured ? 'Destaques' : categoryName.value || 'Galeria'))

function mediaType(item) {
  if (item.media_type) return item.media_type
  if (item.youtube_id) return 'youtube'
  if (item.image_url && /\.(mp4|webm|mov)(\?|$)/i.test(item.image_url)) return 'video'
  return 'image'
}

function youtubeEmbed(id) {
  return `https://www.youtube.com/embed/${id}?controls=1&rel=0&modestbranding=1&playsinline=1`
}

async function loadMedia() {
  items.value = []
  categoryName.value = ''
  if (!supabase) return

  try {
    if (props.featured) {
      let query = supabase
        .from('media_items')
        .select('*')
        .eq('featured', true)
        .eq('published', true)
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: false })

      let result = await query
      if (result.error) {
        result = await supabase
          .from('media_items')
          .select('*')
          .eq('featured', true)
          .order('sort_order', { ascending: true })
          .order('created_at', { ascending: false })
      }
      items.value = result.data || []
      return
    }

    if (!props.categorySlug) return
    const categoryResult = await supabase
      .from('categories')
      .select('id,name,slug')
      .eq('slug', props.categorySlug)
      .maybeSingle()

    if (categoryResult.error || !categoryResult.data) return
    categoryName.value = categoryResult.data.name

    let result = await supabase
      .from('media_items')
      .select('*')
      .eq('category_id', categoryResult.data.id)
      .eq('published', true)
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false })

    if (result.error) {
      result = await supabase
        .from('media_items')
        .select('*')
        .eq('category_id', categoryResult.data.id)
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: false })
    }

    items.value = result.data || []
  } catch {
    items.value = []
  }
}

function openLightbox(item) {
  activeImage.value = item
  document.body.style.overflow = 'hidden'
}

function closeLightbox() {
  activeImage.value = null
  document.body.style.overflow = ''
}

watch(() => [props.categorySlug, props.featured], loadMedia)
onMounted(loadMedia)
onBeforeUnmount(() => {
  document.body.style.overflow = ''
})
</script>

<style scoped>
.managed-gallery{background:#01240e;color:#f2ede5;padding:92px max(6vw,24px) 104px}
.managed-gallery__inner{max-width:1224px;margin:0 auto}
.managed-gallery__header{display:flex;align-items:end;justify-content:space-between;gap:28px;margin-bottom:36px}
.managed-gallery__eyebrow{margin:0 0 10px;color:#c4a44a;font:500 11px/1.4 var(--font-secondary,Arial,sans-serif);letter-spacing:.18em;text-transform:uppercase}
.managed-gallery h2{margin:0;font:400 clamp(2.5rem,5vw,4.8rem)/.98 var(--font-primary,Georgia,serif)}
.managed-gallery__count{margin:0 0 6px;color:rgba(242,237,229,.6);font:12px var(--font-secondary,Arial,sans-serif);letter-spacing:.08em;text-transform:uppercase}
.managed-gallery__grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:28px 22px}
.managed-card{min-width:0}
.managed-card--featured{grid-column:span 2}
.managed-card__media{position:relative;display:block;width:100%;overflow:hidden;border:0;padding:0;background:#0a120c;aspect-ratio:4/5}
.managed-card--featured .managed-card__media{aspect-ratio:16/10}
.managed-card__media--button{cursor:zoom-in}
.managed-card__media img,.managed-card__video video,.managed-card__video iframe{display:block;width:100%;height:100%;border:0;object-fit:cover}
.managed-card__media img{transition:transform .35s ease,filter .35s ease}
.managed-card__media--button:hover img,.managed-card__media--button:focus-visible img{transform:scale(1.035);filter:saturate(1.06)}
.managed-card__zoom{position:absolute;right:16px;bottom:16px;display:grid;width:40px;height:40px;place-items:center;border:1px solid rgba(255,255,255,.7);border-radius:50%;color:white;font-size:24px;opacity:0;transition:opacity .2s ease,transform .2s ease}
.managed-card__media--button:hover .managed-card__zoom,.managed-card__media--button:focus-visible .managed-card__zoom{opacity:1;transform:translateY(-3px)}
.managed-card__caption{padding:14px 2px 0}
.managed-card__caption strong{display:block;font:400 24px/1.1 var(--font-primary,Georgia,serif)}
.managed-card__caption p{margin:8px 0 0;color:rgba(242,237,229,.68);font:300 13px/1.6 var(--font-secondary,Arial,sans-serif)}
.managed-lightbox{position:fixed;inset:0;z-index:200;display:grid;place-items:center;padding:26px;background:rgba(1,15,8,.96)}
.managed-lightbox figure{display:grid;max-width:min(94vw,1200px);max-height:92vh;margin:0;justify-items:center}
.managed-lightbox figure img{display:block;max-width:92vw;max-height:82vh;object-fit:contain}
.managed-lightbox figcaption{display:grid;gap:5px;margin-top:14px;text-align:center}
.managed-lightbox figcaption strong{font:400 22px var(--font-primary,Georgia,serif)}
.managed-lightbox figcaption span{color:rgba(242,237,229,.72);font:13px var(--font-secondary,Arial,sans-serif)}
.managed-lightbox__close{position:absolute;top:20px;right:24px;display:grid;width:46px;height:46px;place-items:center;border:1px solid rgba(255,255,255,.45);border-radius:50%;background:transparent;color:white;font-size:32px;cursor:pointer}
@media(max-width:900px){.managed-gallery{padding:64px 20px 76px}.managed-gallery__header{align-items:flex-start;flex-direction:column}.managed-gallery__grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:18px 12px}.managed-card--featured{grid-column:span 2}}
@media(max-width:560px){.managed-gallery__grid{grid-template-columns:1fr}.managed-card--featured{grid-column:span 1}.managed-card--featured .managed-card__media{aspect-ratio:4/5}.managed-gallery__count{display:none}}
</style>
