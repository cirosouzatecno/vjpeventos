<template>
  <a
    v-if="href"
    class="whats-app-bubble"
    :href="href"
    rel="noopener noreferrer"
    title="Abrir WhatsApp"
    target="_blank"
    aria-label="Abrir WhatsApp"
  >
    <svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="32" cy="32" r="32" fill="#1f3624" />
      <path
        fill="#c9a84c"
        d="M32 14.4C22.3 14.4 14.4 22.3 14.4 32c0 3.1.85 6.1 2.45 8.7L14.4 49.6l9.15-2.4a17.5 17.5 0 0 0 8.45 2.15c9.7 0 17.6-7.9 17.6-17.6S41.7 14.4 32 14.4Zm0 32.2a14.5 14.5 0 0 1-7.4-2.05l-.53-.32-5.43 1.43 1.45-5.3-.35-.55A14.57 14.57 0 1 1 32 46.6Zm8-10.9c-.44-.22-2.6-1.28-3-1.43-.4-.15-.69-.22-.98.22-.3.44-1.14 1.43-1.4 1.72-.26.3-.52.33-.97.11-.44-.22-1.87-.69-3.55-2.2-1.31-1.17-2.2-2.62-2.46-3.06-.26-.44-.03-.68.2-.9.2-.19.44-.5.66-.75.22-.25.3-.44.44-.73.15-.3.08-.56-.04-.78-.11-.22-1-2.4-1.37-3.27-.36-.86-.72-.74-1-.75h-.84c-.3 0-.78.11-1.18.56-.4.44-1.54 1.5-1.54 3.67s1.58 4.26 1.8 4.55c.22.3 3.1 4.73 7.5 6.64 1.05.45 1.87.72 2.5.92.05.02.09.02.14.03 1.06.3 2.03.26 2.8.16.85-.12 2.6-1.07 2.97-2.1.37-1.02.37-1.9.26-2.09-.11-.18-.4-.3-.84-.52Z"
      />
    </svg>
  </a>
</template>

<script setup>
import { computed } from 'vue'
import { whatsAppNumber, whatsAppMessage, isFloatingWhatsAppWidgetEnabled } from '@/data/siteMeta.js'
import { buildWhatsAppUrl } from './whatsAppUrl.js'

const href = computed(() => buildWhatsAppUrl(whatsAppNumber, whatsAppMessage, isFloatingWhatsAppWidgetEnabled))
</script>
