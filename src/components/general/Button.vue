<template>
  <button @click="$emit('click')" :class="classes">
    {{ text }}
  </button>
</template>

<script>
export default {
  name: 'vpo-button',
  props: {
    outlined: Boolean,
    dark: Boolean,
    text: String
  },
  computed: {
    classes() {
      return {
        'vpo-button': true,
        'badge': true,
        'button': true,
        'button--dark': this.dark,
        'button--outlined': this.outlined
      }
    }
  }
}
</script>
