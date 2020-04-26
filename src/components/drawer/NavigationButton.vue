<template>
  <h2 class="navigation-button" @click="$emit('click')">
    {{ text }}
    <navigation-icon />
    <span :class="type ? `type-background type-background--${type}` : ''" />
  </h2>
</template>

<script>
export default {
  name: 'navigation-button',
  props: {
    text: String,
    type: String
  }
}
</script>

<style lang="scss" scoped>
.navigation-button {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;

  color: black;
  text-transform: uppercase;
  padding: 6px 14px;
  cursor: pointer;

  font: {
    family: 'Play';
    weight: normal;
    size: 18px;
  }

  &:hover {
    background-color: rgba(black, 0.08);
  }

  & > span {
    position: absolute;
    height: 100%;
    width: 5px;
    right: 0;

    &:not(.type-background) {
      background-color: black;
    }
  }
}
</style>
