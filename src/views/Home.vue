<template>
  <div class="home">
    <div class="home__separator">
      Todos os resultados
    </div>
    <div class="home__activities">
      <activity
        :key="i"
        v-for="(activity, i) in activities"
        :id="i"
        :title="activity.title"
        :brand="activity.brand"
        :type="activity.type"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'home',
  computed: mapState({ activities: state => state.activities.allActivities })
}
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: center;

  &__separator {
    @extend %side-padding;
    padding-top: 12px;
    padding-bottom: 12px;
    margin-top: 32px;
    width: 100%;

    text-transform: uppercase;
    background-color: black;
    font: {
      size: 24px;
      weight: bold;
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
