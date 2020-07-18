<template>
  <div :class="`current-section-indicator separator-bar ${type ? `type-background type-background--${type}` : ($route.name === 'favorites' ? 'type-background type-background--favorites' : 'current-section-indicator--all')}`">
    <div v-if="activity">
      <router-link :to="{ name: 'all-activities' }">Navegar</router-link> >
      <router-link :to="{ name: 'type-filter', params: { type } }">{{ typeLabel }}</router-link> >
      <router-link :to="{ name: 'subtype-filter', params: { type, subtype } }">{{ subtypeLabel }}</router-link>
    </div>
    <div v-else-if="type">
      <span class="separator-bar__main">{{ typeLabel }}</span>
      <span>| {{ subtypeLabel }}</span>
    </div>
    <span class="separator-bar__main" v-else-if="$route.name === 'about'">Sobre</span>
    <div v-else-if="$route.name === 'favorites'">
      <heart-icon />
      <span class="separator-bar__main">Minhas favoritas</span>
    </div>
    <div v-else-if="$route.name === 'list-details'">
      <list-icon />
      <span class="separator-bar__main">{{ this.$route.params.listId }}</span>
    </div>
    <div v-else-if="$route.name === 'lists'">
      <list-icon />
      <span class="separator-bar__main">Minhas listas</span>
    </div>
    <span class="separator-bar__main" v-else>Todos os resultados</span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import typeName from '@/js/typeName'
import subtypeName from '@/js/subtypeName'
import subtypesByType from '@/js/subtypesByType'

export default {
  name: 'current-section-indicator',
  computed: {
    ...mapGetters({ getById: 'activities/getById' }),
    activity() {
      return this.getById(this.$route.params.id)
    },
    type() {
      return this.$route.params.type || (this.activity ? this.activity.type : null)
    },
    subtype() {
      if (!this.type) {
        return null
      }

      return this.$route.params.subtype || (this.activity ? this.activity.subtype : null) || subtypesByType[this.type].slice(-1)[0]
    },
    typeLabel() {
      return typeName[this.type].toLowerCase()
    },
    subtypeLabel() {
      return subtypeName[this.subtype]
    }
  }
}
</script>

<style lang="scss" scoped>
.current-section-indicator {
  &--all {
    background-color: black;
  }

  & > div {
    color: white;

    & > a {
      text-decoration: none;
      text-transform: capitalize;
      color: white;
      margin: 0 4px;

      &:first-child {
        margin-left: 0;
      }
    }

    > .heart-icon, > .list-icon {
      fill: white;
      margin-bottom: -2px;
      margin-right: 6px;
      height: 12px;
      width: 16px;
    }
  }

  @include breakpoint('large') {
    & > div {
      > .heart-icon, > .list-icon {
        margin-bottom: -1px;
        height: 16px;
      }
    }
  }
}
</style>
