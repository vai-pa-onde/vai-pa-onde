<template>
  <div class="filter">
    <current-section-indicator />
    <activity-list :activities="activities" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import typeName from '@/js/typeName'
import subtypesByType from '@/js/subtypesByType'
import subtypeName from '@/js/subtypeName'

export default {
  name: 'filtered-list',
  computed: {
    ...mapGetters({
      filterByType: 'activities/filterByType',
      filterBySubtype: 'activities/filterBySubtype'
    }),
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

      return this.filterByType(this.type)
    }
  },
  beforeRouteEnter(to, from, next) {
    if (!Object.keys(typeName).includes(to.params.type)) {
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

  &__activities {
    @extend %side-padding;
    margin: 32px 0;
    display: grid;
    grid-template-columns: repeat(4, 270px);
    gap: 40px;
  }

  @media screen and (max-width: 1264px) {
    &__activities {
      grid-template-columns: repeat(3, 260px);
    }
  }

  @media screen and (max-width: 992px) {
    &__activities {
      grid-template-columns: repeat(2, 235px);
    }
  }

  @media screen and (max-width: 576px) {
    &__activities {
      gap: 16px 8px;
      grid-template-columns: repeat(2, 165px);
    }
  }

  @media screen and (max-width: 374px) {
    &__activities {
      grid-template-columns: repeat(1, 220px);
    }
  }
}
</style>
