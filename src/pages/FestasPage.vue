<template>
  <div class="festas-empty">
    <Header />
    <main class="festas-empty__content">
      <p class="eyebrow">VJ Eventos</p>
      <h1>Festas</h1>
      <p>Este espaço está sendo reorganizado. A galeria completa de fotos e vídeos agora está disponível em Festas 2.</p>
      <RouterLink class="festas-empty__link" to="/festas-2">Acessar Festas 2</RouterLink>
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { useHead } from '@unhead/vue'
import Header from '@/pages/shared/Header.vue'
import Footer from '@/pages/shared/Footer.vue'

useHead({
  htmlAttrs: { lang: 'pt-BR' },
  title: 'Festas | VJ Eventos',
})
</script>

<style scoped>
.festas-empty{min-height:100vh;background:#f4f0e9;color:#17372a}.festas-empty__content{display:flex;min-height:70vh;flex-direction:column;align-items:center;justify-content:center;padding:140px 24px 100px;text-align:center}.festas-empty h1{margin:14px 0;font-family:var(--font-primary,serif);font-size:clamp(52px,9vw,110px);font-weight:400;line-height:.95}.festas-empty p:not(.eyebrow){max-width:520px;color:#5c665f;font-size:17px;line-height:1.7}.eyebrow{letter-spacing:.18em;text-transform:uppercase;font-size:11px;color:#ad7e39}.festas-empty__link{margin-top:22px;color:#17372a;text-decoration:underline;text-underline-offset:5px}
</style>
