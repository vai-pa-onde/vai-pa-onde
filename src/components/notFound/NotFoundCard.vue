<template>
  <div class="not-found-card">
    <div class="not-found-card__content">
      <character-icon />
      <div>
        <h1>Veio pa onde?</h1>
        <p><slot /></p>
      </div>
    </div>
    <colors-stripe />
  </div>
</template>

<script>
export default {
  name: 'not-found-card'
}
</script>

<style lang="scss" scoped>
.not-found-card {
  background-color: white;
  max-width: 800px;
  width: fit-content;

  &__content {
    display: flex;
    color: black;
    padding: 24px 42px;

    & > .character-icon {
      width: 60px;
    }

    & > div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 30px;

      & > h1 {
        margin-bottom: 8px;
        font: {
          size: 32px;
          weight: bold
        }
      }

      & > p {
        font-size: 24px;
      }
    }
  }

  & > .colors-stripe {
    height: 2px;
  }

  @media screen and (max-width: 576px) {
    &__content {
      padding: 18px 28px;

      & > div {
        & > h1 {
          font-size: 20px;
        }

        & > p {
          font-size: 16px;
        }
      }
    }
  }
}
</style>
