<template>
  <span :class="`type-badge type-background type-background--${type}`">{{ badgeText }}</span>
</template>

<script>
import typeName from '@/js/typeName'

export default {
  name: 'type-badge',
  props: {
    type: {
      type: String,
      validator: s => ['course', 'event', 'product', 'content'].includes(s)
    }
  },
  computed: {
    badgeText() {
      return typeName[this.type]
    }
  }
}
</script>

<style lang="scss" scoped>
.type-badge {
  display: block;
  padding: 6px;
  color: white;
  text-transform: uppercase;
  width: min-content;
  font: {
    size: 16px;
    weight: bold;
  }
}
</style>
