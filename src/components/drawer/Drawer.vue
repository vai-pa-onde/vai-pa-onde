<template>
  <div class="drawer">
    <div class="drawer__hamburger" @click="() => $emit('input', true)">
      <hamburger-icon />
    </div>
    <div @click="() => $emit('input', false)" :class="`drawer__overlay ${value ? 'drawer__overlay--open' : ''}`">
      <div class="drawer__overlay__content" @click.stop>
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'drawer',
  props: {
    value: Boolean
  }
}
</script>

<style lang="scss" scoped>
.drawer {
  z-index: 1000;
  &__hamburger {
    cursor: pointer;

    & > .hamburguer-icon {
      display: block;
      height: 30px;
      width: 30px;
    }
  }

  &__overlay {
    transition: opacity 0.3s ease;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(black, 0.35);
    pointer-events: none;
    opacity: 0;

    &--open {
      pointer-events: all;
      opacity: 1;
    }

    &--open &__content {
      margin-left: 0;
    }

    &__content {
      transition: margin-left 0.3s ease;
      background-color: white;
      max-width: 60vw;
      height: 100%;
      margin-left: -50vw;
      width: min-content;
    }

    @media screen and (max-width: 400px) {
      &__content {
        max-width: 75vw;
        margin-left: -75vw;
      }
    }
  }
}
</style>
