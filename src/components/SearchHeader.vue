<template>
  <header class="search-header">
    <div>
      <logo />
      <contribute-button />
    </div>
  </header>
</template>

<script>
export default {
  name: 'search-header'
}
</script>

<style lang="scss" scoped>
.search-header {
  @extend %side-padding;
  margin-top: 32px;

  &  > div {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }
}
</style>
