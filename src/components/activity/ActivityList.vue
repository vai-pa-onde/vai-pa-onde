<template>
  <list-layout :items="activities" :isSkeleton="isSkeleton" :showOptions="showOptions">
    <template v-slot:options>
      <activity-sort />
      <p>{{ isSkeleton ? 88 : activities.length }} entrada{{ activities.length > 1 ? 's' : '' }}</p>
    </template>
    <template v-slot:skeleton="{ index }">
      <activity-skeleton :key="index"/>
    </template>
    <template v-slot:item="{ item }">
      <activity
        :key="item.id"
        :id="item.id"
        :title="item.title"
        :brand="item.brand"
        :type="item.type"
        :validUntilDate="item.validUntilDate"
      />
    </template>
  </list-layout>
</template>

<script>
export default {
  name: 'activity-list',
  props: {
    activities: Array,
    isSkeleton: Boolean,
    showOptions: Boolean
  }
}
</script>

<style lang="scss" scoped>
.activity-list {
  @extend %side-padding;
  margin: 12px 0 44px 0;

  &--not-found {
    display: flex;
    margin-top: 64px;

    .not-found-card {
      margin: 0 auto;
    }
  }

  &--skeleton {
    .activity-list__options > p {
      color: transparent;
      background-color: lightgray;
      border-radius: 5px;
    }
  }

  &__container {
    width: 220px;
    justify-content: center;
  }

  &__options {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    margin: 0 6px 6px 6px;
    color: black;
    font: {
      family: 'Play';
      size: 12px;
    }

    & > p {
      flex-basis: 100%;
      margin-top: 6px;
    }
  }

  &__activities {
    display: grid;
    grid-template-columns: repeat(1, 220px);
    gap: 16px 8px;
  }

  @media screen and (min-width: 374px) {
    &__container {
      width: 336px;
    }

    &__activities {
      grid-template-columns: repeat(2, 165px);
    }
  }

  @include breakpoint('small') {
    &__container {
      width: 510px;
    }

    &__options {
      font-size: 18px;
      margin-bottom: 12px;

      & > p {
        flex-basis: auto;
      }
    }

    &__activities {
      gap: 40px;
      grid-template-columns: repeat(2, 235px);
    }
  }

  @include breakpoint('large') {
    &__container {
      width: 860px;
    }

    &__activities {
      grid-template-columns: repeat(3, 260px);
    }
  }

  @media screen and (min-width: 1264px) {
    &__container {
      width: 1200px;
    }

    &__activities {
      grid-template-columns: repeat(4, 270px);
    }
  }
}
</style>
