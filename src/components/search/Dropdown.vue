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
    type: String,
    selected: String
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
      if (option.includes('all')) {
        this.$router.push({
          name: 'type-filter',
          params: { type: this.type }
        })
      } else {
        this.$router.push({
          name: 'subtype-filter',
          params: {
            type: this.type,
            subtype: option
          }
        })
      }

      this.$emit('selected')
    }
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

  @media screen and (max-width: 654px) {
    border-right: 5px solid map-get($colors-util, $color);
  }
}

.dropdown {
  position: relative;
  cursor: pointer;
  width: min-content;
  font-size: 16px;

  &--course {
    @include dropdown-style('yellow');
  }

  &--event {
    @include dropdown-style('pink');
  }

  &--product {
    @include dropdown-style('teal');
  }

  &--content {
    @include dropdown-style('red');
  }

  & > .selected {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    border-radius: 10px;
    user-select: none;
    font: {
      size: 1.15em;
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
    box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.2);
    text-transform: none;
    overflow: auto;
    max-height: 260px;

    & > .option {
      padding: 8px 16px;
      font-size: 1em;
      line-height: 1.2;
      color: black;

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

  @media screen and (max-width: 654px) {
    background-color: white;
    color: black;
    fill: black;
    border-radius: 0;
    -webkit-tap-highlight-color: transparent;

    & > .selected {
      font: {
        size: 18px;
        weight: 500;
      }

      & > .open-dropdown-icon {
        height: 15px;
      }
    }

    & > .options {
      top: 0;
      left: 100%;
    }
  }
}
</style>
