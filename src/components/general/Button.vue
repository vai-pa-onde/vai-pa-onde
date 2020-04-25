<template>
  <button @click="$emit('click')" :class="classes" :disabled="loading" >
    <span>{{ text }}</span>
    <div v-if="loading">
      <span />
      <span />
      <span />
      <span />
      <span />
    </div>
  </button>
</template>

<script>
export default {
  name: 'vpo-button',
  props: {
    outlined: Boolean,
    dark: Boolean,
    text: String,
    loading: Boolean
  },
  computed: {
    classes() {
      return {
        'vpo-button': true,
        'badge': true,
        'button': true,
        'button--dark': this.dark,
        'button--outlined': this.outlined,
        'button--loading': this.loading
      }
    }
  }
}
</script>
