<template>
  <div :class="`type-description-card type-background type-background--${type}`">
    <h1 :class="`type-text type-text--${type}`">24</h1>
    <div class="type-description-card__content">
      <h2>{{ content.title }}</h2>
      {{ content.description }}
    </div>
    <div class="type-description-card__cta" @click="$router.push({ name: 'type-filter', params: { type } })">
      Conferir
    </div>
  </div>
</template>

<script>
const contentByType = {
  course: {
    title: 'Cursos',
    description: 'Descrição dessa categoria, com exemplos forem ipsum oadsissad'
  },
  event: {
    title: 'Eventos',
    description: 'Descrição dessa categoria, com exemplos forem ipsum oadsissad'
  },
  product: {
    title: 'Produtos',
    description: 'Descrição dessa categoria, com exemplos forem ipsum oadsissad'
  },
  content: {
    title: 'Conteúdos',
    description: 'Descrição dessa categoria, com exemplos forem ipsum oadsissad'
  }
}

export default {
  name: 'type-description-card',
  props: {
    type: String
  },
  computed: {
    content() {
      return contentByType[this.type]
    }
  }
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
    text-align: center;
    font: {
      size: 18px;
      weight: bold;
    }
  }
}
</style>
