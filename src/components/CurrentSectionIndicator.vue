<template>
  <div :class="`current-section-indicator separator-bar ${type ? `type-background type-background--${type}` : 'current-section-indicator--all'}`">
    <div class="current-section-indicator__search-indicator" v-if="searchString">
      <span class="separator-bar__main">Busca:</span>
      <span>{{ searchString }}</span>
    </div>
    <div v-else-if="type">
      <span class="separator-bar__main">{{ typeLabel }}</span>
      <span>| {{ subtypeLabel }}</span>
    </div>
    <span class="separator-bar__main" v-else>Todos os resultados</span>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import typeName from '@/js/typeName'
import subtypeName from '@/js/subtypeName'
import subtypesByType from '@/js/subtypesByType'

export default {
  name: 'current-section-indicator',
  computed: {
    ...mapState({ searchString: state => state.activities.searchString }),
    type() {
      return this.$route.params.type
    },
    subtype() {
      if (!this.type) {
        return null
      }

      return this.$route.params.subtype || subtypesByType[this.type].slice(-1)[0]
    },
    typeLabel() {
      return typeName[this.type]
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
}
</style>
