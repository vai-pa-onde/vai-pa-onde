<template>
  <a :class="classes" target="_blank" :href="href">
    {{ text }}
  </a>
</template>

<script>
export default {
  name: 'vpo-button',
  props: {
    outlined: Boolean,
    dark: Boolean,
    text: String,
    href: {
      type: String,
      default: '.'
    }
  },
  computed: {
    classes() {
      return {
        'vpo-button': true,
        'badge': true,
        'vpo-button--dark': this.dark,
        'vpo-button--outlined': this.outlined
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.vpo-button {
  color: inherit;
  text-decoration: none;
  white-space: nowrap;
  background-color: map-get($colors-util, 'blue');
  font: {
    size: 24px;
    weight: bold;
  }
  transition: color 0.3s, background-color 0.3s;

  &:hover {
    color: inherit;
    text-decoration: none;
  }

  &--dark {
    background-color: black;
    color: white;

    &:hover {
      color: white;
      background-color: rgba(black, 0.8);
    }
  }

  &--outlined {
    background-color: transparent;
    border: 1px solid white;

    &:hover {
      color: black;
      background-color: white;
    }
  }
}
</style>
