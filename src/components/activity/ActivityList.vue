<template>
  <div :class="`activity-list ${activities.length === 0 ? 'activity-list--not-found' : ''}`">
    <div class="activity-list__container" v-if="activities.length > 0">
      <div class="activity-list__options">
        <p>{{ activities.length }} entrada{{ activities.length > 1 ? 's' : '' }}</p>
      </div>
      <div class="activity-list__activities">
        <activity
          :key="activity.id"
          v-for="activity in activities"
          :id="activity.id"
          :title="activity.title"
          :brand="activity.brand"
          :type="activity.type"
          :image="activity.image"
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
    activities: Array
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

  &__container {
    width: 220px;
    justify-content: center;
  }

  &__options {
    text-align: right;
    color: black;
    font: {
      family: 'Play';
      size: 12px;
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
