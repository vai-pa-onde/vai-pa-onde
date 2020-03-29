<template>
  <div class="colors-stripe">
    <div class="type-background type-background--course" />
    <div class="type-background type-background--event" />
    <div class="type-background type-background--product" />
    <div class="type-background type-background--content" />
  </div>
</template>

<script>
export default {
  name: 'colors-stripe'
}
</script>

<style lang="scss" scoped>
.colors-stripe {
  display: flex;
  width: 100%;
  height: 10px;

  & > div {
    flex: 1;
    height: 100%;
  }
}
</style>
