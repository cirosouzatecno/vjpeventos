<template>
  <li
    v-if="item && !item.isHidden"
    :class="[
      'block-navigation__item',
      isActive ? 'block-navigation__item--active' : '',
      hasDropdown ? 'block-navigation__item--has-dropdown' : '',
    ].filter(Boolean).join(' ')"
  >
    <label v-if="hasDropdown" class="block-navigation__item-label">
      <input type="checkbox" class="block-navigation__mobile-dropdown-trigger" :aria-label="`${label} submenu`" />
      <NavItemLabel :item="item" :activePath="activePath" />
      <div class="block-navigation__dropdown-area">
        <ul class="block-navigation__sublinks">
          <NavItem
            v-for="(sub, si) in item.subItems"
            :key="sub?.id || `${label}-sub-${si}`"
            :item="sub"
            :index="si"
            :activePath="activePath"
            :depth="depth + 1"
          />
        </ul>
      </div>
    </label>
    <NavItemLabel v-else :item="item" :activePath="activePath" />
  </li>
</template>

<script setup>
import { computed, defineAsyncComponent } from 'vue'
import NavItemLabel from './NavItemLabel.vue'

const NavItem = defineAsyncComponent(() => import('./NavItem.vue'))

const props = defineProps({
  item: Object,
  index: { type: Number, default: 0 },
  activePath: { type: String, default: '/' },
  depth: { type: Number, default: 0 },
})

function normalizePath(path) {
  if (!path || path === '/') return '/'
  return path.endsWith('/') ? path.slice(0, -1) : path
}

const label = computed(() => props.item?.text || `Link ${props.index + 1}`)
const hasDropdown = computed(() => Boolean(props.item?.hasDropdown && props.item?.subItems?.length))
const isActive = computed(() => Boolean(props.item?.href && normalizePath(props.item.href) === props.activePath))
</script>
