<template>
  <div class="logo" @click="goToHome">
    <div class="logo__name">Vai pa onde?</div>
    <colors-stripe />
  </div>
</template>

<script>
export default {
  name: 'logo',
  methods: {
    goToHome() {
      if (this.$route.name !== 'home') {
        this.$router.push({ name: 'home' })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.logo {
  display: flex;
  flex-direction: column;
  width: min-content;
  cursor: pointer;
  font: {
    size: 26px;
    family: 'Play';
  }

  &__name {
    background-color: black;
    text-transform: uppercase;
    font-size: 1em;
    font-weight: bold;
    white-space: nowrap;
    padding: 8px 16px;
  }

  @media screen and (min-width: 992px) {
    font-size: 30px;
  }

  @media screen and (min-width: 1200px) {
    font-size: 34px;
  }
}
</style>
