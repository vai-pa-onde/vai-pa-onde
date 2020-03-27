<template>
  <div class="filter">
    <div :class="`filter__separator type-background type-background--${type}`">
      <span class="type">{{ typeLabel }}</span>
      <span class="subtype">| {{ subtypeLabel }}</span>
    </div>
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
    ...mapGetters({ filterByType: 'activities/filterByType' }),
    type() {
      return this.$route.params.type
    },
    subtype() {
      return this.$route.params.subtype || subtypesByType[this.type].slice(-1)
    },
    typeLabel() {
      return typeName[this.type]
    },
    subtypeLabel() {
      return subtypeName[this.subtype]
    },
    activities() {
      return this.filterByType(this.type)
    }
  },
  created() {
    if (!Object.keys(typeName).includes(this.type) || !Object.keys(subtypeName).includes(this.subtype)) {
      this.$router.replace({ name: 'home' })
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

  &__separator {
    @extend %side-padding;
    padding-top: 12px;
    padding-bottom: 12px;
    margin-top: 32px;
    font-size: 24px;
    width: 100%;

    & > .type {
      text-transform: uppercase;
      font-weight: bold;
      margin-right: 6px;
    }
  }

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
