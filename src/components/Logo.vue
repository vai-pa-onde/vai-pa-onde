<template>
  <div class="logo">
    <div class="logo__name">Vai pa onde?</div>
    <div class="logo__decoration">
      <div />
      <div />
      <div />
      <div />
    </div>
  </div>
</template>

<script>
export default {
  name: 'logo'
}
</script>

<style lang="scss" scoped>
.logo {
  display: flex;
  flex-direction: column;
  width: min-content;
  font-size: 55px;

  &__name {
    background-color: black;
    text-transform: uppercase;
    font-size: 1em;
    font-weight: bold;
    white-space: nowrap;
    padding: 8px 16px;
  }

  &__decoration {
    display: inline-flex;
    width: 100%;
    height: 10px;

    & > div {
      width: 25%;
      height: 100%;

      &:nth-child(1) {
        background-color: map-get($colors-util, 'yellow');
      }

      &:nth-child(2) {
        background-color: map-get($colors-util, 'pink');
      }

      &:nth-child(3) {
        background-color: map-get($colors-util, 'teal');
      }

      &:nth-child(4) {
        background-color: map-get($colors-util, 'red');
      }
    }
  }

  @media screen and (max-width: 992px) {
    font-size: 30px;
  }
}
</style>
