<template>
  <a :class="`contribute-button badge ${dark ? 'contribute-button--dark' : ''}`" target="_blank" href=".">
    Contribuir
  </a>
</template>

<script>
export default {
  name: 'contribute-button',
  props: {
    dark: Boolean
  }
}
</script>

<style lang="scss" scoped>
.contribute-button {
  color: inherit;
  text-decoration: none;
  background-color: map-get($colors-util, 'teal');
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
    background-color: transparent;
    border: 1px solid white;

    &:hover {
      color: black;
      background-color: white;
    }
  }
}
</style>
