<template>
  <span :class="`type-badge type-badge--${type}`">{{ badgeText }}</span>
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
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  text-transform: uppercase;
  width: min-content;
  font: {
    size: 16px;
    weight: bold;
  }

  &--course {
    color: map-get($colors-util, 'yellow');
  }

  &--event {
    color: map-get($colors-util, 'pink');
  }

  &--product {
    color: map-get($colors-util, 'teal');
  }

  &--content {
    color: map-get($colors-util, 'red');
  }

  @media screen and (max-width: 576px) {
    font-size: 12px;
  }
}
</style>
