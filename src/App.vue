<template>
  <div id="app">
    <search-header />
    <router-view v-if="activitiesLoaded" />
    <logo-footer />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'app',
  computed: mapState({ activitiesLoaded: state => state.activities.loaded }),
  methods: mapActions({ fetchAcitivies: 'activities/fetch' }),
  created() {
    this.fetchAcitivies()
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Play:400,700&display=swap');
@import 'node_modules/reset-css/sass/reset';
@import '~@/styles/main';

#app {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-family: 'Play', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: white;
  min-height: 100vh;
}
</style>
