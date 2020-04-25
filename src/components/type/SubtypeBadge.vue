<template>
  <span :class="`subtype-badge type-background type-background--${type}`">{{ badgeText }}</span>
</template>

<script>
import subtypeName from '@/js/subtypeName'

export default {
  name: 'subtype-badge',
  props: {
    type: String,
    subtype: String
  },
  computed: {
    badgeText() {
      return subtypeName[this.subtype]
    }
  }
}
</script>

<style lang="scss" scoped>
.subtype-badge {
  display: block;
  padding: 8px 16px;
  text-transform: uppercase;
  white-space: nowrap;
  width: min-content;
  color: white;
  line-height: 22px;
  font: {
    size: 16px;
    weight: bold;
  }

  @media screen and (max-width: 576px) {
    padding: 4px 12px;
    font-size: 12px;
  }
}
</style>
