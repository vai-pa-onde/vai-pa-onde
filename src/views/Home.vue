<template>
  <div class="home">
    <div class="home__separator separator-bar">
      <span class="separator-bar__main">
        O que você quer fazer?
      </span>
    </div>
    <div class="home__content">
      <div class="home__content__counters">
        <activities-counter />
        <activities-counter />
        <activities-counter />
      </div>
      <h1>Vontade de fazer alguma coisa, né minha filha?</h1>
      <div class="home__content__types">
        <type-description-card type="course" />
        <type-description-card type="event" />
        <type-description-card type="product" />
        <type-description-card type="content" />
      </div>
      <vpo-button @click="$router.push({ name: 'all-activities' })" dark text="ver todos" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'all-activities'
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

    & > .vpo-button {
      margin: 24px 16px;
      width: calc(100% - 32px)
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

      & > .vpo-button {
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
        gap: 50px;
      }
    }
  }
}
</style>
