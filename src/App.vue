<template>
  <div id="app">
    <search-header />
    <router-view/>
    <logo-footer />
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Play:400,700&display=swap');
@import 'node_modules/reset-css/sass/reset';
@import '~@/styles/main';

#app {
  display: flex;
  flex-direction: column;
  font-family: 'Play', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: white;
  min-height: 100vh;
}
</style>
