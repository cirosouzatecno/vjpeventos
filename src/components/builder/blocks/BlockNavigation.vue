<template>
  <div v-if="isSticky" ref="stickyTriggerRef" class="sticky-trigger" aria-hidden="true" />
  <div ref="headerRef" :class="containerClass" :style="headerStyle">
    <header class="block-navigation">
      <div
        :class="[
          'block-navigation__inner',
          `block-navigation__inner--${layout}`,
          `block-navigation__inner--${mobileLayout}`,
        ].join(' ')"
      >
        <SmartLink v-if="isLogoVisible" class="block-navigation__logo" :href="logoHref || '/'">
          <img v-if="logoSrc" class="block-navigation__logo-image" :src="logoSrc" :alt="logoAlt || logoText || 'Logo'" />
          <span v-else class="block-navigation__logo-text">{{ logoText }}</span>
        </SmartLink>

        <button
          type="button"
          :class="['block-navigation__hamburger', isMobileMenuOpen ? 'block-navigation__hamburger--open' : ''].filter(Boolean).join(' ')"
          :aria-expanded="isMobileMenuOpen"
          aria-controls="block-navigation-menu"
          :aria-label="isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
        >
          <span class="block-navigation__hamburger-line" />
          <span class="block-navigation__hamburger-line" />
          <span class="block-navigation__hamburger-line" />
        </button>

        <div
          id="block-navigation-menu"
          :class="[
            'block-navigation__end',
            `block-navigation__end--align-${mobileLinksAlignment}`,
            isMobileMenuOpen ? 'block-navigation__end--open' : '',
          ].filter(Boolean).join(' ')"
        >
          <ul class="block-navigation__links">
            <NavItem
              v-for="(item, index) in navItems"
              :key="item?.id || `${item?.text || 'link'}-${index}`"
              :item="item"
              :index="index"
              :activePath="activePath"
            />
          </ul>

          <div class="block-navigation__right-side">
            <div
              v-if="socialIcons?.props"
              :class="['block-navigation__component', isSocialIconsStandalone ? 'block-navigation__social-slot' : ''].filter(Boolean).join(' ')"
            >
              <GridSocialIcons
                :id="socialIcons.props.id"
                class="block-navigation__social-icons"
                :links="socialIcons.props.links"
                :iconSize="socialIcons.props.iconSize"
                :iconColor="socialIcons.props.iconColor"
                :iconColorHover="socialIcons.props.iconColorHover"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import SmartLink from '../SmartLink.vue'
import NavItem from './NavItem.vue'
import GridSocialIcons from '../elements/GridSocialIcons.vue'

function normalizePath(path) {
  if (!path || path === '/') return '/'
  return path.endsWith('/') ? path.slice(0, -1) : path
}

function setPageHeaderHeight(el, heightPx, { isTransparent = false } = {}) {
  const page = el?.closest?.('.page')
  if (!page) return
  if (!isTransparent) {
    page.style.removeProperty('--header-height')
    page.style.removeProperty('--header-height-mobile')
    return
  }
  const value = `${Math.round(heightPx)}px`
  page.style.setProperty('--header-height', value)
  page.style.setProperty('--header-height-mobile', value)
}

const props = defineProps({
  logoSrc: String,
  logoText: { type: String, default: 'Home' },
  logoHref: { type: String, default: '/' },
  logoAlt: String,
  logoHeightDesktop: [String, Number],
  logoHeightMobile: [String, Number],
  nav: { type: Array, default: () => [] },
  style: { type: Object, default: () => ({}) },
  layout: { type: String, default: 'desktop-1' },
  mobileLayout: { type: String, default: 'mobile-1' },
  mobileLinksAlignment: { type: String, default: 'left' },
  isLogoVisible: { type: Boolean, default: true },
  isSticky: { type: Boolean, default: false },
  isTransparent: { type: Boolean, default: false },
  socialIcons: { type: Object, default: null },
})

const route = useRoute()
const stickyTriggerRef = ref(null)
const headerRef = ref(null)
const hasUserScrolled = ref(false)
const isMobileMenuOpen = ref(false)

const navItems = computed(() => Array.isArray(props.nav) ? props.nav : [])
const activePath = computed(() => normalizePath(route.path))
const isOpaque = computed(() => !props.isTransparent || (props.isSticky && hasUserScrolled.value))
const isSocialIconsStandalone = computed(() => props.layout === 'desktop-5')

const containerClass = computed(() => [
  'top-blocks',
  props.isSticky ? 'top-blocks--sticky' : '',
  props.isSticky && hasUserScrolled.value ? 'top-blocks--with-shadow' : '',
  isOpaque.value ? 'top-blocks--opaque' : '',
  isMobileMenuOpen.value ? 'top-blocks--nav-open' : '',
].filter(Boolean).join(' '))

const headerStyle = computed(() => ({
  ...props.style,
  ...(props.logoHeightDesktop != null
    ? { '--logo-height': typeof props.logoHeightDesktop === 'number' ? `${props.logoHeightDesktop}px` : props.logoHeightDesktop }
    : {}),
  ...(props.logoHeightMobile != null
    ? { '--m-logo-height': typeof props.logoHeightMobile === 'number' ? `${props.logoHeightMobile}px` : props.logoHeightMobile }
    : {}),
}))

let resizeObserver = null
let intersectionObserver = null

function publishHeight() {
  const el = headerRef.value
  if (!el) return
  setPageHeaderHeight(el, el.getBoundingClientRect().height, { isTransparent: props.isTransparent })
}

onMounted(() => {
  if (headerRef.value) {
    publishHeight()
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(publishHeight)
      resizeObserver.observe(headerRef.value)
    } else {
      window.addEventListener('resize', publishHeight)
    }
  }

  if (props.isSticky && stickyTriggerRef.value && typeof IntersectionObserver !== 'undefined') {
    intersectionObserver = new IntersectionObserver(([entry]) => {
      hasUserScrolled.value = !entry.isIntersecting
    }, { threshold: 1 })
    intersectionObserver.observe(stickyTriggerRef.value)
  }
})

onUnmounted(() => {
  if (resizeObserver) resizeObserver.disconnect()
  else window.removeEventListener('resize', publishHeight)
  if (intersectionObserver) intersectionObserver.disconnect()
  document.body.style.removeProperty('overflow')
})

watch(() => route.path, () => {
  isMobileMenuOpen.value = false
})

watch(isMobileMenuOpen, (open) => {
  if (open) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.removeProperty('overflow')
  }
})
</script>
