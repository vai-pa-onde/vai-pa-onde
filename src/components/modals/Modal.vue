<template>
  <div :class="`modal ${value ? 'modal--open' : ''}`" @click="$emit('input', false)">
    <div class="modal__box">
      <h1 class="modal__box__title">{{ title }}</h1>
      <div class="modal__box__content">
        <slot />
      </div>
      <div class="modal__box__actions">
        <vpo-button text="cancelar" @click="$emit('input', false)" />
        <vpo-button :text="action" @click="$emit('confirm')" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'modal',
  props: {
    title: String,
    action: String,
    value: Boolean
  }
}
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;

  height: 100vh;
  width: 100vw;
  background-color: rgba(black, 0.4);
  border-radius: 12px;

  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s;

  &--open {
    opacity: 1;
    pointer-events: all;
  }

  &__box {
    background-color: white;
    max-width: 100%;
    max-height: 100%;

    &__title {
      padding: 16px;
      font: {
        family: 'Play';
        font-size: 16px;
        font-weight: bold;
      }
    }

    &__content {
      overflow-y: auto;
      padding: 12px 16px;
    }

    &__actions {
      display: flex;
      width: 100%;
      padding: 16px;

      & > .button {
        margin-left: 18px;
      }
    }
  }

  @include breakpoint('medium') {
    &__box {
      max-width: 450px;
    }
  }

  @include breakpoint('large') {
    &__box {
      max-width: 600px;
    }
  }
}
</style>
