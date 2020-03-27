<template>
  <div :class="`dropdown dropdown--${type}`" @click="toggle" @mousedown.prevent="() => {}">
    <div class="selected">
      {{ dropdownText }}
      <input ref="search" readonly="readonly" role="combobox" type="search" autocomplete="off" @blur="hide">
      <open-dropdown-icon />
    </div>
    <div class="options" v-if="isOpen">
      <div
        :key="option.id"
        v-for="option in options"
        :class="{ 'option': true, 'option--selected': selected === option.id }"
        @click="() => set(option.id)"
      >
        {{ option.name }}
      </div>
    </div>
  </div>
</template>

<script>
import typeName from '@/js/typeName'
import subtypeName from '@/js/subtypeName'
import subtypesByType from '@/js/subtypesByType'

export default {
  name: 'dropdown',
  props: {
    type: String
  },
  data: () => ({
    isOpen: false
  }),
  computed: {
    dropdownText() {
      return typeName[this.type]
    },
    options() {
      return subtypesByType[this.type].map(it => ({ id: it, name: subtypeName[it] }))
    }
  },
  methods: {
    toggle() {
      this.$refs.search.select()
      this.isOpen = !this.isOpen
    },
    hide() {
      this.isOpen = false
    },
    set(option) {
      this.$router.push({
        name: 'filter'
      })
      this.selected = option
    }
  },
  created() {
    const subtypes = subtypesByType[this.type]
    this.selected = subtypes[subtypes.length - 1]
  }
}
</script>

<style lang="scss">
@mixin dropdown-style($color) {
  background-color: rgba(map-get($colors-util, $color), 0.25);
  color: map-get($colors-util, $color);
  fill: map-get($colors-util, $color);

  .option {
    &:hover {
      background-color: rgba(map-get($colors-util, $color), 0.25);
      color: map-get($colors-util, $color);
    }

    &:last-child {
      border-bottom: 3px solid map-get($colors-util, $color);
    }
  }
}

.dropdown {
  position: relative;
  cursor: pointer;
  width: min-content;

  &:nth-child(1) {
    @include dropdown-style('yellow');
  }

  &:nth-child(2) {
    @include dropdown-style('pink');
  }

  &:nth-child(3) {
    @include dropdown-style('teal');
  }

  &:nth-child(4) {
    @include dropdown-style('red');
  }

  & > .selected {
    display: flex;
    align-items: center;
    width: 100%;
    border-radius: 10px;
    user-select: none;
    font: {
      size: 18px;
      weight: bold;
    }

    & > input {
      border: none;
      padding: 0;
      width: 0;
    }

    & > .open-dropdown-icon {
      width: 12px;
      height: 12px;
      margin-left: 6px;
    }
  }

  & > .options {
    position: absolute;
    left: 0;
    top: 100%;
    z-index: 1;
    background-color: white;
    box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.04);
    text-transform: none;

    & > .option {
      padding: 8px 16px;
      font-size: 16px;
      line-height: 19px;
      color: black;

      &:first-child {
        border-top: 3px solid white;
      }

      &--selected {
        font-weight: bold;
      }
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: all .25s ease-out;
  }

  .fade-enter, .fade-leave-active {
    opacity: 0;
    transform: translateY(-30px);
  }
}
</style>
