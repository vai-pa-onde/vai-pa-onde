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
  learn: {
    title: 'Aprender',
    description: 'Cursos online, palestra, mentoras. Para todos os interesses, idades e níveis de especialidade, e o que é melhor: grátis!'
  },
  participate: {
    title: 'Participar',
    description: 'Aqui você vai encontrar shows, lives, festivais e congressos. Tudo online, hein?'
  },
  do: {
    title: 'Fazer',
    description: 'Atividades para fazer com seus filhos, streaming e aplicativos liberados de graça. O que tá esperando?'
  },
  share: {
    title: 'Compartilhar',
    description: 'Informações sobre a pandemia, podcasts, listas, perfis do Instagram e canais do YouTube interessantes'
  }
}

export default {
  name: 'type-description-card',
  props: {
    type: String
  },
  computed: {
    ...mapGetters({ activitiesByType: 'activities/getByType' }),
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
  display: flex;
  flex-direction: column;
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
    flex-grow: 1;

    & > h2 {
      text-transform: uppercase;
      font: {
        size: 1.2em;
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
      size: 1.2em;
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
      font-size: 28px;
    }

    &__cta {
      font-size: 28px;
    }
  }
}
</style>
