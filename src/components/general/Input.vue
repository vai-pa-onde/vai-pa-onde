<template>
  <div class="vpo-input">
    <div class="vpo-input__field">
      <input v-model="inputValue" :placeholder="placeholder + (optional ? ' (opcional)' : '')" :required="!optional" />
      <div class="vpo-input__field__action" v-if="action" @click="$emit('actionClick')">{{ action }}</div>
    </div>
    <p class="vpo-input__label" v-if="label">{{ label }}</p>
  </div>
</template>

<script>
export default {
  name: 'vpo-input',
  props: {
    placeholder: String,
    label: String,
    action: String,
    optional: Boolean,
    value: String
  },
  data: () => ({
    inputValue: null
  }),
  watch: {
    inputValue(val) {
      this.$emit('input', val)
    }
  },
  created() {
    this.inputValue = this.value
  }
}
</script>

<style lang="scss" scoped>
.vpo-input {
  margin-bottom: 12px;

  &__field {
    position: relative;
    border-bottom: 1px solid black;

    > input {
      appearance: none;
      outline: none;
      border-radius: 0;
      border: none;
      width: 100%;

      background-color: map-get($colors-util, 'light-gray');
      padding: 10px 8px;

      width: 100%;
      font: {
        size: 12px;
        weight: 500;
      }
    }

    > div {
      position: absolute;
      display: flex;
      border-radius: 4px;
      height: 18px;
      right: 8px;
      top: calc(50% - 9px);
      color: white;
      background-color: black;
      padding: 0 4px;
      text-transform: uppercase;
      align-items: center;
      cursor: pointer;

      font: {
        size: 10px;
        family: 'Play', sans-serif
      }
    }
  }

  & > p {
    line-height: 1;
    font-size: 9px;
    margin-top: 4px;
    color: black;
  }

  @include breakpoint('extra-small') {
    & > input {
      font-size: 14px;
    }

    & > p {
      font-size: 11px;
    }
  }

  @include breakpoint('small') {
    margin-bottom: 18px;

    & > input {
      font-size: 16px;
    }

    & > p {
      font-size: 12px;
    }
  }
}
</style>
