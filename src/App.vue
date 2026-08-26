<template>
  <RouterView />
  <WhatsAppBubble />
</template>

<script setup>
import { RouterView } from 'vue-router'
import WhatsAppBubble from '@/components/builder/WhatsAppBubble.vue'
</script>
