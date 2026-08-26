<template>
  <button v-if="tagName === 'button'" :type="buttonType" v-bind="sharedAttrs">{{ text }}</button>
  <SmartLink v-else v-bind="sharedAttrs" :href="isDisabled ? undefined : href" :target="target" :rel="rel">{{ text }}</SmartLink>
</template>

<script setup>
import { computed } from 'vue'
import SmartLink from '../SmartLink.vue'

const props = defineProps({
  id: String,
  text: { type: String, default: '' },
  type: { type: String, default: 'primary' },
  href: { type: String, default: '#' },
  target: { type: String, default: '_self' },
  rel: String,
  buttonType: { type: String, default: 'button' },
  tagName: { type: String, default: 'a' },
  isDisabled: { type: Boolean, default: false },
  isLoading: { type: Boolean, default: false },
  fontFamily: String,
  fontWeight: [String, Number],
  borderRadius: [String, Number],
  borderWidth: [String, Number],
  backgroundColor: String,
  fontColor: String,
  borderColor: String,
  backgroundColorHover: String,
  fontColorHover: String,
  borderColorHover: String,
  fontSizeDesktop: Number,
  fontSizeMobile: Number,
  mobileWidthVw: { type: String, default: '100%' },
  mobileHeightVw: { type: String, default: 'min-content' },
})

function px(v) {
  if (v == null) return undefined
  return `${v}px`
}

const btnStyle = computed(() => ({
  '--font-size-mobile': px(props.fontSizeMobile),
  '--font-size-desktop': px(props.fontSizeDesktop),
  '--font-family': props.fontFamily || undefined,
  '--font-weight': props.fontWeight || undefined,
  '--border-radius': props.borderRadius != null ? px(props.borderRadius) : undefined,
  '--border-width': props.borderWidth != null ? px(props.borderWidth) : '0px',
  '--background-color': props.backgroundColor || undefined,
  '--font-color': props.fontColor || undefined,
  '--border-color': props.borderColor || undefined,
  '--background-color-hover': props.backgroundColorHover || undefined,
  '--font-color-hover': props.fontColorHover || undefined,
  '--border-color-hover': props.borderColorHover || undefined,
  '--m-width': props.mobileWidthVw,
  '--m-height': props.mobileHeightVw,
}))

const btnClass = computed(() => [
  'grid-button',
  `grid-button--${props.type}`,
  !props.text ? 'grid-button--empty' : '',
  props.isLoading ? 'loading' : '',
].filter(Boolean).join(' '))

const sharedAttrs = computed(() => ({
  id: props.id,
  class: btnClass.value,
  style: btnStyle.value,
  'data-element-id': props.id,
  disabled: props.tagName === 'button' ? props.isDisabled : undefined,
}))
</script>
