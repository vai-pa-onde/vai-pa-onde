<template>
  <span class="subtype-badge">{{ badgeText }}</span>
</template>

<script>
import subtypeName from '@/js/subtypeName'

export default {
  name: 'subtype-badge',
  props: {
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
  padding: 6px;
  text-transform: uppercase;
  width: min-content;
  color: white;
  font: {
    size: 16px;
    weight: bold;
  }

  @media screen and (max-width: 576px) {
    font-size: 12px;
  }
}
</style>
