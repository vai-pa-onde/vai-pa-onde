<template>
  <span :class="`type-badge type-text type-text--${type}`">{{ badgeText }}</span>
</template>

<script>
import typeName from '@/js/typeName'

export default {
  name: 'type-badge',
  props: {
    type: {
      type: String
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
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  padding: 6px;
  text-transform: uppercase;
  width: min-content;
  font: {
    size: 16px;
    weight: bold;
    family: 'Play', sans-serif;
  }

  @media screen and (max-width: 576px) {
    font-size: 12px;
  }
}
</style>
