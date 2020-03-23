<template>
  <footer class="logo-footer">
    <div class="logo-footer__content">
      <logo />
      <contribute-button dark />
    </div>
  </footer>
</template>

<script>
export default {
  name: 'logo-footer'
}
</script>

<style lang="scss" scoped>
.logo-footer {
  @extend %side-padding;
  display: flex;
  height: 150px;
  padding-top: 16px;
  background-color: black;

  &__content {
    width: 100%;
    height: min-content;
    display: flex;
    justify-content: space-between;
    align-items: center;

    & > .logo {
      font-size: 34px;
    }
  }
}
</style>
