<template>
  <div class="chooser">
    <div :class="{ 'chooser__option': true, 'chooser__option--small': !option.label }" :key="i" v-for="(option, i) in options">
      <input
        @input="$emit('input', option.value)"
        :checked="option.value === value ? 'checked' : null"
        :value="option.value"
        :disabled="option.disabled"
        :id="`${_uid}__${option.value}`"
        :name="`vpo-chooser__${_uid}`"
        :class="option.type ? `type-background type-background--${option.type}` : ''"
        type="radio"
      />
      <label :for="`${_uid}__${option.value}`">
        <p :class="option.type ? `type-text type-text--${option.type}` : ''">{{ option.text }}</p>
        <span v-if="option.label">{{ option.label }}</span>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'chooser',
  props: {
    options: Array,
    value: String
  },
  watch: {
    options: 'filterNotDisabled'
  },
  methods: {
    filterNotDisabled() {
      const notDisabled = this.options.filter(it => !it.disabled)

      if (notDisabled.includes(this.value)) {
        return
      }

      this.$emit('input', notDisabled.length > 0 ? notDisabled[0].value : '')
    }
  },
  mounted() {
    this.filterNotDisabled()
  }
}
</script>

<style lang="scss">
.chooser {
  &__option {
    display: flex;
    align-items: center;
    height: 40px;
    padding: 4px 0;
    margin-bottom: 2px;
    cursor: pointer;

    &--small {
      height: 25px;
    }

    & > input {
      appearance: none;
      width: 4px;
      margin: 0;
      height: 100%;
      outline: none;
      transition: background-color 0.2s;
      cursor: pointer;

      &:not(.type-background) {
        background-color: black;
      }

      &:disabled + label {
        text-decoration: line-through;
      }

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
      cursor: pointer;
      height: 100%;
      width: 100%;
      justify-content: center;

      & > p, & > span {
        transition: color 0.2s;
        line-height: 1;
      }

      & > p {
        text-transform: uppercase;
        font-size: 12px;
        font-weight: 600;
        margin-bottom: 2px;
        white-space: nowrap;
      }

      & > span {
        font-size: 9px;
      }
    }
  }

  @include breakpoint('extra-small') {
    &__option {
      height: 42px;
      padding: 2px 0;

      &--small {
        height: 32px;
      }

      & > label {
        & > p {
          font-size: 14px;
        }

        & > span {
          font-size: 11px;
        }
      }
    }
  }

  @include breakpoint('small') {
    &__option {
      height: 40px;
      padding: 4px 0;
      margin-bottom: 4px;

      & > label {
        margin-left: 6px;

        & > p {
          font-size: 16px;
        }

        & > span {
          font-size: 12px;
        }
      }
    }
  }
}
</style>
