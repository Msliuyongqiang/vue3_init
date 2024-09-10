<template>
  <!-- 原生 SVG 图标 -->
  <svg :class="svgClass" :style="{ color: props.color }" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script setup>
const props = defineProps({
  iconClass: {
    type: String,
    required: true
  },
  className: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: '#000000'
  }
})

const iconName = computed(() => `#icon-${props.iconClass}`)
const svgClass = computed(() => {
  if (props.className) {
    return `svg-icon ${props.className}`
  }
  return 'svg-icon'
})
</script>

<style scoped lang="scss">
.icon-wrapper {
  display: inline-block;
  font-size: 15px; // 可调整以适应大小
  margin-right: 12px;
  position: relative;
  vertical-align: middle;
}

.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  vertical-align: -0.125em;
}
.iconClass {
  width: 1em;
  height: 1em;
  margin-right: 16px;
  fill: currentColor;
  vertical-align: -0.125em;
}
</style>
