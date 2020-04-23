<template>
  <div :class="`modal ${value ? 'modal--open' : ''}`" @click="$emit('input', false)">
    <div class="modal__box" @click.stop>
      <h1 class="modal__box__title">{{ title }}</h1>
      <div class="modal__box__content">
        <slot />
      </div>
      <div class="modal__box__actions">
        <vpo-button outlined dark text="cancelar" @click="$emit('input', false)" />
        <vpo-button dark :text="action" @click="$emit('confirm')" />
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
  },
  watch: {
    value() {
      if (this.value) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = 'auto'
      }
    }
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

  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s;

  &--open {
    opacity: 1;
    pointer-events: all;
  }

  &__box {
    display: flex;
    flex-direction: column;
    background-color: white;
    max-width: 100%;
    max-height: 100%;
    border-radius: 12px;
    overflow: hidden;

    &__title {
      padding: 18px 48px;
      background-color: black;
      text-transform: uppercase;
      text-align: center;
      font: {
        family: 'Play';
        size: 28px;
        weight: bold;
      }
    }

    &__content {
      overflow-y: auto;
      padding: 12px 18px;
    }

    &__actions {
      display: flex;
      justify-content: flex-end;
      width: 100%;
      padding: 16px;

      & > .button {
        margin-left: 18px;
      }
    }
  }

  @include breakpoint('medium') {
    &__box {
      width: 475px;
      max-width: 475px;
    }
  }
}
</style>
