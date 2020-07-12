<template>
  <div :class="`list-layout ${items.length === 0 && !isSkeleton ? 'list-layout--not-found' : ''} ${isSkeleton ? 'list-layout--skeleton' : ''}`">
    <div class="list-layout__container" v-if="items.length > 0 || isSkeleton">
      <div class="list-layout__options" v-if="showOptions">
        <slot name="options" />
      </div>
      <div class="list-layout__items" v-if="isSkeleton">
        <slot name="skeleton" :index="i" v-for="i in Array(8).keys()" />
      </div>
      <div class="list-layout__items" v-else>
        <slot name="item" :item="item" v-for="item in items"/>
      </div>
    </div>
    <div class="list-layout__container" v-else>
      <not-found-card>Nenhum resultado correspondente com sua pesquisa</not-found-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'list-layout',
  props: {
    items: Array,
    isSkeleton: Boolean,
    showOptions: Boolean
  }
}
</script>

<style lang="scss" scoped>
.list-layout {
  @extend %side-padding;
  margin: 12px 0 44px 0;

  &--not-found {
    display: flex;
    margin-top: 64px;

    .not-found-card {
      margin: 0 auto;
    }
  }

  &--skeleton {
    .list-layout__options > p {
      color: transparent;
      background-color: lightgray;
      border-radius: 5px;
    }
  }

  &__container {
    width: 220px;
    justify-content: center;
  }

  &__options {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    margin: 0 6px 6px 6px;
    color: black;
    font: {
      family: 'Play';
      size: 12px;
    }

    & > p {
      flex-basis: 100%;
      margin-top: 6px;
    }
  }

  &__items {
    display: grid;
    grid-template-columns: repeat(1, 220px);
    gap: 16px 8px;
  }

  @media screen and (min-width: 374px) {
    &__container {
      width: 336px;
    }

    &__items {
      grid-template-columns: repeat(2, 165px);
    }
  }

  @include breakpoint('small') {
    &__container {
      width: 510px;
    }

    &__options {
      font-size: 18px;
      margin-bottom: 12px;

      & > p {
        flex-basis: auto;
      }
    }

    &__items {
      gap: 40px;
      grid-template-columns: repeat(2, 235px);
    }
  }

  @include breakpoint('large') {
    &__container {
      width: 860px;
    }

    &__items {
      grid-template-columns: repeat(3, 260px);
    }
  }

  @media screen and (min-width: 1264px) {
    &__container {
      width: 1200px;
    }

    &__items {
      grid-template-columns: repeat(4, 270px);
    }
  }
}
</style>
