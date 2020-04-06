<template>
  <div :class="`type-description-card type-background type-background--${type}`">
    <h1 :class="`type-text type-text--${type}`">{{ numberOfActivities }}</h1>
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
import { mapGetters } from 'vuex'

const contentByType = {
  course: {
    title: 'Cursos',
    description: 'Descrição dessa categoria, com exemplos lorem ipsum oadsissad'
  },
  event: {
    title: 'Eventos',
    description: 'Descrição dessa categoria, com exemplos lorem ipsum oadsissad'
  },
  product: {
    title: 'Produtos',
    description: 'Descrição dessa categoria, com exemplos lorem ipsum oadsissad'
  },
  content: {
    title: 'Conteúdos',
    description: 'Descrição dessa categoria, com exemplos lorem ipsum oadsissad'
  }
}

export default {
  name: 'type-description-card',
  props: {
    type: String
  },
  computed: {
    ...mapGetters({ activitiesByType: 'search/filterByType' }),
    content() {
      return contentByType[this.type]
    },
    numberOfActivities() {
      return this.activitiesByType(this.type).length
    }
  }
}
</script>

<style lang="scss">
.type-description-card {
  font-size: 14px;

  & > h1 {
    background-color: rgba(white, 0.75);
    padding: 8px;
    font: {
      family: 'Play';
      size: 2.3em;
      weight: bold;
    }
  }

  &__content {
    color: white;
    font-size: 1em;
    line-height: 1.35;
    padding: 8px;

    & > h2 {
      text-transform: uppercase;
      font: {
        size: 1.25em;
        weight: bold;
      }
    }
  }

  &__cta {
    padding: 8px;
    background-color: rgba(black, 0.15);
    text-transform: uppercase;
    text-align: center;
    cursor: pointer;
    font: {
      size: 1.3em;
      weight: bold;
    }
  }

  @include breakpoint('small') {
    font-size: 18px;
  }

  @include breakpoint('medium') {
    font-size: 16px;
  }

  @include breakpoint('large') {
    font-size: 18px;

    & > h1 {
      font-size: 60px;
    }

    & > h1, &__content, &__cta {
      padding: 10px 18px;
    }
  }

  @include breakpoint('extra-large') {
    font-size: 18px;

    & > h1 {
      font-size: 100px;
    }

    &__content > h2 {
      font-size: 30px;
    }

    &__cta {
      font-size: 30px;
    }
  }
}
</style>
