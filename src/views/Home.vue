<template>
  <div class="home">
    <div class="home__separator">
      Todos os resultados
    </div>
    <activity-list :activities="activities" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'home',
  computed: mapGetters({ activities: 'activities/all' })
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
}
</style>
