<template>
  <div class="home">
    <div class="home__separator separator-bar">
      <span class="separator-bar__main">
        O que você quer fazer?
      </span>
    </div>
    <div class="home__content">
      <div class="home__content__counters">
        <activities-counter type="published" />
        <activities-counter type="valid" :routeTo="{ name: 'all-activities' }" />
      </div>
      <h1>Vontade de fazer alguma coisa, né minha filha?</h1>
      <div class="home__content__types">
        <type-description-card :key="type" v-for="type in types" :type="type" />
      </div>
      <vpo-button @click="$router.push({ name: 'all-activities' })" dark text="ver todos" />
      <router-link :to="{ name: 'lists' }" dark class="badge button button--dark button--outlined">
        <list-icon />
        minhas listas
      </router-link>
    </div>
  </div>
</template>

<script>
import typeName from '@/js/typeName'
import config from '@/config'

export default {
  name: 'all-activities',
  computed: {
    types() {
      return Object.keys(typeName)
    }
  },
  metaInfo: {
    title: 'Vai pa onde?',
    meta: [
      { vmid: 'description', name: 'description', content: config.defaultDescription },
      { vmid: 'og:description', name: 'og:description', content: config.defaultDescription }
    ],
    link: [
      { rel: 'canonical', href: `https://vaipaonde.netlify.app` }
    ]
  }
}
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: center;

  &__separator {
    background-color: black;
  }

  &__content {
    @extend %side-padding;
    padding-top: 18px;
    padding-bottom: 48px;
    background-color: map-get($colors-util, 'light-gray');
    flex-grow: 1;

    &__counters {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
      margin-bottom: 24px;
    }

    & > h1 {
      display: none;
    }

    &__types {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 8px;
    }

    & > .button {
      margin: 24px 16px;
      width: calc(100% - 32px);

      > .list-icon {
        height: .9rem;
        margin-right: 12px;
        margin-left: -12px;
        transition: 0.3s fill;
      }

      &:hover > .list-icon {
        fill: white;
      }
    }
  }

  @media screen and (min-width: 420px) {
    &__content > h1 {
      display: block;
      text-transform: uppercase;
      color: black;
      margin-bottom: 12px;
      font: {
        family: 'Play';
        size: 14px;
        weight: bold;
      }
    }
  }

  @include breakpoint('small') {
    &__content {
      &__counters {
        gap: 16px;
        margin-bottom: 28px;
      }

      & > h1 {
        margin-bottom: 16px;
        font-size: 18px;
      }

      &__types {
        gap: 16px;
      }

      & > .button {
        margin: 24px auto;
        max-width: 300px;
      }
    }
  }

  @include breakpoint('medium') {
    &__content__types {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  @include breakpoint('large') {
    &__content {
      &__counters {
        gap: 32px;
        margin-bottom: 32px;
      }

      &__types {
        gap: 32px;
      }

      & > .button {
        font-size: 20px;
      }
    }
  }

  @include breakpoint('extra-large') {
    &__content {
      &__counters {
        gap: 50px;
        margin-bottom: 30px;
      }

      & > h1 {
        margin-bottom: 18px;
        font-size: 20px;
      }

      &__types {
        gap: 36px;
      }
    }
  }
}
</style>
