<template>
  <div :class="`activity-list ${activities.length === 0 && !isSkeleton ? 'activity-list--not-found' : ''} ${isSkeleton ? 'activity-list--skeleton' : ''}`">
    <div class="activity-list__container" v-if="activities.length > 0 || isSkeleton">
      <div class="activity-list__options" v-if="showOptions">
        <activity-sort />
        <p>{{ isSkeleton ? 88 : activities.length }} entrada{{ activities.length > 1 ? 's' : '' }}</p>
      </div>
      <div class="activity-list__activities" v-if="isSkeleton">
        <activity-skeleton :key="i" v-for="i in Array(8).keys()"/>
      </div>
      <div class="activity-list__activities" v-else>
        <activity
          :key="activity.id"
          v-for="activity in activities"
          :id="activity.id"
          :title="activity.title"
          :brand="activity.brand"
          :type="activity.type"
          :validUntilDate="activity.validUntilDate"
        />
      </div>
    </div>
    <div class="activity-list__container" v-else>
      <not-found-card>Nenhum resultado correspondente com sua pesquisa</not-found-card>
    </div>
  </div>
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
