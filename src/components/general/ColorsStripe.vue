<template>
  <div class="colors-stripe">
    <div class="type-background type-background--learn" />
    <div class="type-background type-background--participate" />
    <div class="type-background type-background--do" />
    <div class="type-background type-background--share" />
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
