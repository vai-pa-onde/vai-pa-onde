<template>
  <router-link :to="{ name: 'favorites' }" class="badge button favorites-button">
    <heart-icon />
    Favoritas
  </router-link>
</template>

<script>
export default {
  name: 'favorites-button'
}
</script>

<style lang="scss">
.favorites-button {
  display: flex;
  align-items: center;
  text-decoration: none;
  margin: 0 0 0 auto;
  background-color: map-get($colors-util, 'blue');
  color: white;
  font: {
    family: 'Play';
    size: 16px;
    weight: 900;
  };

  .heart-icon {
    width: 15px;
    margin-right: 8px;
  }
}
</style>
