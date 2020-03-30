<template>
  <a :class="classes" target="_blank" :href="href">
    {{ text }}
  </a>
</template>

<script>
export default {
  name: 'vpo-link',
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
        'vpo-link': true,
        'badge': true,
        'button': true,
        'button--dark': this.dark,
        'button--outlined': this.outlined
      }
    }
  }
}
</script>
