<template>
  <div class="activities-counter">
    <h1>30</h1>
    <div class="activities-counter__content">
      <p>Ações</p>
      <h2>Adicionadas hoje</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: 'activities-counter'
}
</script>

<style lang="scss" scoped>
.activities-counter {
  border-radius: 8px;
  overflow: hidden;

  & > h1 {
    width: 100%;
    padding: 8px;
    text-align: center;
    background-color: map-get($colors-util, 'blue');
    color: white;
    font: {
      size: 40px;
      weight: bold;
    }
  }

  &__content {
    background-color: white;
    padding: 6px;
    text-align: center;

    & > p {
      margin-bottom: 6px;
      color: black;
      font: {
        size: 14px;
        weight: 500;
      }
    }

    & > h2 {
      color: black;
      font: {
        size: 16px;
        weight: bold;
      }
    }
  }

  @include breakpoint('medium') {
    display: flex;

    & > h1 {
      width: auto;
      // border-left: 20px solid #0079BA;
      background-color: white;
      color: black;
      padding: 20px 12px 20px 32px;
    }

    &__content {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      justify-content: center;
      text-align: left;
      padding: 0 24px;
    }
  }

  @include breakpoint('large') {
    & > h1 {
      font-size: 50px;
    }

    &__content {
      & > p, & > h2 {
        font-size: 18px;
      }
    }
  }

  @include breakpoint('extra-large') {
    & > h1 {
      font-size: 64px;
    }
  }
}
</style>
