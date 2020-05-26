<template>
  <div class="activity-sort" @click="toggle" @mousedown.prevent="() => {}">
    <div class="selected">
      <sort-order-icon />
      {{ dropdownText }}
      <input ref="search" readonly="readonly" role="combobox" type="search" autocomplete="off" @blur="hide">
    </div>
    <div class="options" v-if="isOpen">
      <div
        :key="option.id"
        v-for="option in options"
        :class="{ 'option': true, 'option--selected': option.id === sortType }"
        @click="() => set(option.id)"
      >
        {{ option.text }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
const options = {
  publishedAt: 'Mais recentes',
  validUntil: 'Mais perto do vencimento'
}

export default {
  name: 'activity-sort',
  data: () => ({
    isOpen: false
  }),
  computed: {
    ...mapState({ sortType: state => state.search.sortBy }),
    dropdownText() {
      return options[this.sortType]
    },
    options() {
      return Object.entries(options).map(entry => ({ id: entry[0], text: entry[1] }))
    }
  },
  methods: {
    ...mapMutations({ setSortType: 'search/changeSort' }),
    toggle() {
      this.$refs.search.select()
      this.isOpen = !this.isOpen
    },
    hide() {
      this.isOpen = false
    },
    set(option) {
      this.setSortType(option)
    }
  }
}
</script>

<style lang="scss">
.activity-sort {
  position: relative;
  cursor: pointer;
  width: min-content;
  font-size: 14px;

  & > .selected {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    user-select: none;
    white-space: nowrap;

    font: {
      size: 1em;
      weight: bold;
    }

    & > input {
      border: none;
      padding: 0;
      width: 0;
    }

    & > svg {
      margin-right: 6px;
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

    & > .option {
      padding: 8px 16px;
      font-size: 1em;
      line-height: 1.2;
      color: black;
      white-space: nowrap;

      &--selected {
        font-weight: bold;
      }

      &:hover {
        background-color: rgba(0, 0, 0, 0.08);
      }

      &:last-child {
        border-bottom: 3px solid black;
      }
    }
  }

  @include breakpoint('small') {
    font-size: 16px;
  }
}
</style>
