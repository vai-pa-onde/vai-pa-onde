<template>
  <div class="filter">
    <current-section-indicator />
    <div>
      <search-bar :placeholder="`Buscar em ${typeLabel.toLowerCase()}`" :type="type" />
      <activity-list :isSkeleton="loading" :activities="activities" showOptions />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import typeName from '@/js/typeName'
import subtypesByType from '@/js/subtypesByType'
import subtypeName from '@/js/subtypeName'
import config from '@/config'

export default {
  name: 'filter-list',
  computed: {
    ...mapGetters({
      allActivities: 'search/activities',
      filterByType: 'search/filterByType',
      filterBySubtype: 'search/filterBySubtype'
    }),
    ...mapState({ loading: state => !state.activities.loaded }),
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
        return typeName[this.type]
      }

      return 'Todos os resultados'
    },
    subtypeLabel() {
      return subtypeName[this.subtype]
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
  },
  metaInfo() {
    let title = 'Vai pa onde?'
    let href = 'https://vaipaonde.com.br'
    if (this.type) {
      title += ` | ${this.typeLabel}`
      href += `/categoria/${this.type}`

      if (this.subtype && !this.subtype.includes('all')) {
        title += ` - ${this.subtypeLabel}`
        href += `/subcategoria/${this.subtype}`
      }
    } else {
      title += ' | Todas as ações'
      href += 'todas'
    }

    return {
      title,
      meta: [
        { vmid: 'description', name: 'description', content: config.defaultDescription },
        { vmid: 'og:description', name: 'og:description', content: config.defaultDescription }
      ],
      link: [
        { rel: 'canonical', href }
      ]
    }
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

  @include breakpoint('large') {
    margin-top: 32px;;
  }
}
</style>
