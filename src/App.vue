<template>
  <div id="app">
    <search-header />
    <router-view />
    <logo-footer />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'app',
  computed: mapState({ activitiesLoaded: state => state.activities.loaded }),
  methods: mapActions({
    fetchAcitivies: 'activities/fetch',
    loadFavorites: 'favorites/load'
  }),
  async created() {
    await this.fetchAcitivies()
    this.loadFavorites()
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Play:wght@400;700&family=Work+Sans:wght@400;500;700;900&display=swap');
@import 'node_modules/reset-css/sass/reset';
@import '~@/styles/main';

*, *::after, *::before {
  box-sizing: border-box;
}

#app {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-family: 'Work Sans', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: white;
  min-height: 100vh;
}
</style>
