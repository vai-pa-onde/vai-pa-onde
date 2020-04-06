<template>
  <div class="filter">
    <current-section-indicator />
    <div>
      <div class="filter__search-bar">
        <div class="filter__search-bar__search">
          <span :class="type ? `type-background type-background--${type}` : ''"/>
          <input :value="searchString" @input="searchChanged" :placeholder="`Buscar em ${typeLabel}`">
        </div>
      </div>
      <activity-list :activities="activities" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import typeName from '@/js/typeName'
import subtypesByType from '@/js/subtypesByType'
import subtypeName from '@/js/subtypeName'

export default {
  name: 'filter-list',
  computed: {
    ...mapGetters({
      allActivities: 'activities/all',
      filterByType: 'activities/filterByType',
      filterBySubtype: 'activities/filterBySubtype'
    }),
    ...mapState({ searchString: state => state.activities.searchString }),
    type() {
      return this.$route.params.type
    },
    subtype() {
      return this.$route.params.subtype || subtypesByType[this.type].slice(-1)[0]
    },
    activities() {
      if (this.$route.params.subtype) {
        return this.filterBySubtype(this.subtype)
      }

      if (this.$route.params.type) {
        return this.filterByType(this.type)
      }

      return this.allActivities
    },
    typeLabel() {
      if (this.type) {
        return typeName[this.type].toLowerCase()
      }

      return 'todos os resultados'
    }
  },
  methods: {
    searchChanged() {

    }
  },
  beforeRouteEnter(to, from, next) {
    if (!!to.params.type && !Object.keys(typeName).includes(to.params.type)) {
      return next(false)
    }

    if (!!to.params.subtype && !Object.keys(subtypeName).includes(to.params.subtype)) {
      return next(false)
    }

    next()
  }
}
</script>

<style lang="scss" scoped>
.filter {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: center;
  background-color: map-get($colors-util, 'light-gray');
  margin-top: 16px;

  & > .separator-bar {
    margin-top: 0;
  }

  &__search-bar {
    @extend %side-padding;
    margin-top: 14px;
    width: 100%;

    &__search {
      display: flex;
      border-radius: 10px;
      overflow: hidden;

      & > span {
        width: 5px;

        &:not(.type-background) {
          background-color: black;
        }
      }

      & > input {
        appearance: none;
        outline: none;
        border: none;
        font-size: 16px;
        line-height: 19px;
        color: #777;
        padding: 8px 8px 8px 32px;
        flex-grow: 1;
        background: {
          color: white;
          repeat: no-repeat;
          image: url("~@/assets/search.svg");
          size: 16px 16px;
          position: 8px center;
        }

        &::placeholder {
          color: #A8A8A8;
        }
      }
    }
  }

  @include breakpoint('large') {
    margin-top: 32px;;
  }
}
</style>
