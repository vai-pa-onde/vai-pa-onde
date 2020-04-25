<template>
  <div :class="`modal ${value ? 'modal--open' : ''}`" @click="$emit('input', false)">
    <div class="modal__box" @click.stop>
      <h1 :class="`modal__box__title ${error ? 'modal__box__title--error' : ''}`">{{ title }}</h1>
      <div class="modal__box__content">
        <slot />
      </div>
      <div class="modal__box__actions">
        <vpo-button outlined dark text="cancelar" @click="$emit('input', false)" />
        <vpo-button dark :error="error" :text="action" :loading="isActionLoading" @click="$emit('confirm')" />
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
    isActionLoading: Boolean,
    error: Boolean,
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
  align-items: flex-end;
  padding-top: 40px;

  height: 100vh;
  width: 100vw;
  background-color: rgba(black, 0.6);

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
    max-width: 100%;
    max-height: 100%;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    overflow: hidden;

    &__title {
      padding: 14px 0;
      background-color: black;
      text-transform: uppercase;
      text-align: center;
      font: {
        family: 'Play';
        size: 18px;
        weight: bold;
      }

      &--error {
        background-color: map-get($colors-util, 'red');
      }
    }

    &__content {
      overflow-y: auto;
      padding: 12px 16px;
      color: black;
      font-size: 12px;
      line-height: 1.4;
      background-color: white;
    }

    &__actions {
      display: flex;
      justify-content: flex-end;
      width: 100%;
      padding: 12px;
      border-top: 1px solid rgba(0, 0, 0, 0.2);
      background-color: white;

      & > .button {
        margin-left: 18px;
      }
    }
  }

  @include breakpoint('extra-small') {
    &__box {
      &__title {
        font-size: 24px;
      }

      &__content {
        font-size: 14px;
      }
    }
  }

  @include breakpoint('small') {
    padding: 40px;
    align-items: center;

    &__box {
      border-radius: 12px;
    }
  }

  @include breakpoint('medium') {
    &__box {
      width: 575px;
      max-width: 575px;

      &__title {
        padding: 18px 48px;
        font-size: 32px;
      }

      &__content {
        padding: 20px 38px;
        font-size: 16px;
      }

      &__actions {
        padding: 16px;
      }
    }
  }

  @include breakpoint('large') {
    &__box {
      width: 650px;
      max-width: 650px;
    }
  }
}
</style>
