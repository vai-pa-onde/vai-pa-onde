<template>
  <div class="vpo-input">
    <input v-model="inputValue" :placeholder="placeholder + (optional ? ' (opcional)' : '')" :required="!optional" />
    <p class="vpo-input__label" v-if="label">{{ label }}</p>
  </div>
</template>

<script>
export default {
  name: 'vpo-input',
  props: {
    placeholder: String,
    label: String,
    optional: Boolean,
    value: String
  },
  data: () => ({
    inputValue: null
  }),
  created() {
    this.inputValue = this.value
  }
}
</script>

<style lang="scss" scoped>
.vpo-input {
  margin-bottom: 12px;

  & > input {
    appearance: none;
    outline: none;
    border: none;

    background-color: map-get($colors-util, 'light-gray');
    padding: 10px 8px;

    border-radius: 0;
    border-bottom: 1px solid black;

    width: 100%;
    font: {
      size: 12px;
      weight: 500;
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
