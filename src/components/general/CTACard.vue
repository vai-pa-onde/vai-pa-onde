<template>
  <router-link :class="classes" :to="to">
    <div :class="`cta-card__title ${type ? `type-text type-text--${type}` : ''}`">
      <h1>{{ numberOfActivities }}</h1>
      <span>ações</span>
    </div>
    <div class="cta-card__content">
      <slot name="content" />
    </div>
    <div class="cta-card__cta">
      Conferir
    </div>
  </router-link>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'cta-card',
  props: {
    to: Object,
    type: String,
    numberOfActivities: Number
  },
  computed: {
    ...mapState({ loading: state => !state.activities.loaded }),
    ...mapGetters({ activitiesByType: 'activities/getByType' }),
    classes() {
      return {
        'cta-card': true,
        'type-background': !!this.type,
        [`type-background--${this.type}`]: !!this.type,
        'cta-card--loading': this.loading
      }
    }
  }
}
</script>

<style lang="scss">
.cta-card {
  display: flex;
  flex-direction: column;
  font-size: 12px;
  text-decoration: none;
  color: inherit;
  transition: box-shadow 0.2s ease-in-out, transform 0.2s ease-in-out, border-color 0.2s ease-in-out;
  border: 0px solid map-get($colors-util, 'light-gray');

  &:hover {
    transform: translateY(-4px);
    border-color: white;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
  }

  &--loading {
    background-color: grey;

    h1, h2, p, span {
      color: transparent;
      background-color: rgba(0, 0, 0, 0.1);
      border-radius: 4px;
      box-decoration-break: clone;
    }
  }

  &__title {
    display: flex;
    align-items: baseline;
    background-color: rgba(white, 0.75);
    padding: 8px;

    font: {
      family: 'Play';
      size: 2.3em;
      weight: bold;
    }

    & > h1 {
      letter-spacing: -2px;
      line-height: 1;
    }

    & > span {
      font-size: 0.5em;
      margin-left: 6px;
      letter-spacing: 0;
    }
  }

  &__content {
    color: white;
    font-size: 1em;
    line-height: 1.35;
    padding: 8px;
    flex-grow: 1;

    & > h2 {
      margin-bottom: 2px;
      line-height: 1;
      text-transform: uppercase;
      font: {
        size: 1.1em;
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
    border-width: 6px;

    &__title > span {
      font-size: 0.6em;
      margin-left: 8px;
    }
  }

  @include breakpoint('large') {
    font-size: 18px;

    &__title {
      font-size: 60px;

      & > span {
        font-size: 0.4em;
      }
    }

    &__title, &__content, &__cta {
      padding: 10px 18px;
    }
  }

  @include breakpoint('extra-large') {
    font-size: 18px;

    &__title {
      font-size: 100px;

      & > h1 {
        letter-spacing: -6px;
      }

      & > span {
        font-size: 0.3em;
        margin-left: 12px;
      }
    }

    &__content > h2 {
      font-size: 24px;
    }

    &__cta {
      font-size: 24px;
    }
  }
}
</style>
