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
}
</style>
