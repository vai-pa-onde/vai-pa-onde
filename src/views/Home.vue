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
    font-size: 12px;
  }

  &__content {
    @extend %side-padding;
    margin-top: 18px;
    background-color: map-get($colors-util, 'light-gray');

    &__counters {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
      margin-bottom: 18px;
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
}
</style>
