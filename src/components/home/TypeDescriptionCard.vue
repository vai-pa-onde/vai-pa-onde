<template>
  <div class="type-description-card type-background type-background--course">
    <h1 class="type-text type-text--course">24</h1>
    <div class="type-description-card__content">
      <h2>Cursos</h2>
      Descrição dessa categoria, com exemplos forem ipsum oadsissad
    </div>
    <div class="type-description-card__cta" @click="$emit('click')">
      Conferir
    </div>
  </div>
</template>

<script>
export default {
  name: 'type-description-card'
}
</script>

<style lang="scss">
.type-description-card {
  & > h1 {
    background-color: rgba(white, 0.75);
    padding: 8px;
    font: {
      family: 'Play';
      size: 32px;
      weight: bold;
    }
  }

  &__content {
    color: white;
    font-size: 14px;
    line-height: 1.35;
    padding: 8px;

    & > h2 {
      text-transform: uppercase;
      font: {
        size: 22px;
        weight: bold;
      }
    }
  }

  &__cta {
    padding: 8px;
    background-color: rgba(black, 0.15);
    text-transform: uppercase;
    font: {
      size: 18px;
      weight: bold;
    }
  }
}
</style>
