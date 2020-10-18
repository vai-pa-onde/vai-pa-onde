<template>
  <div class="colors-stripe">
    <div class="type-background type-background--free" />
    <div class="type-background type-background--certificated" />
    <div class="type-background type-background--events" />
    <div class="type-background type-background--contents" />
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
