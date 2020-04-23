<template>
  <div class="chooser">
    <div class="chooser__option" :key="i" v-for="(option, i) in options">
      <input
        @input="$emit('input', option.value)"
        :checked="i === 0 ? 'checked' : null"
        :value="option.value"
        :id="option.value"
        :name="`vpo-chooser__${_uid}`"
        :class="`type-background type-background--${option.type}`"
        type="radio"
      />
      <label :for="option.value">
        <p :class="`type-text type-text--${option.type}`">{{ option.text }}</p>
        <span v-if="option.label">{{ option.label }}</span>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'chooser',
  props: {
    options: Array
  },
  mounted() {
    this.$emit('input', this.options[0].value)
  }
}
</script>

<style lang="scss">
.chooser {
  &__option {
    display: flex;
    align-items: center;
    height: 36px;
    padding: 4px 0;

    & > input {
      appearance: none;
      width: 4px;
      margin: 0;
      height: 100%;
      outline: none;
      transition: background-color 0.2s;

      &:not(:checked) {
        background-color: map-get($colors-util, 'light-gray');

        & + label {
          & > p, & > span {
            color: map-get($colors-util, 'dark-gray');
          }
        }
      }
    }

    & > label {
      display: flex;
      flex-direction: column;
      color: black;
      margin-left: 6px;

      & > p, & > span {
        transition: color 0.2s;
      }

      & > p {
        text-transform: uppercase;
        font-size: 12px;
        font-weight: 600;
        margin-bottom: 2px;
      }

      & > span {
        font-size: 9px;
      }
    }
  }
}
</style>
