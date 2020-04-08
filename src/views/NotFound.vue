<template>
  <div class="not-found">
    <not-found-card>A página que você está procurando não existe 😱</not-found-card>
  </div>
</template>

<script>
export default {
  name: 'not-found'
}
</script>

<style lang="scss" scoped>
.not-found {
  @extend %side-padding;
  width: 100%;

  & > .not-found-card {
    margin: 0 auto;
    background-color: map-get($colors-util, 'light-gray');
  }
}
</style>
