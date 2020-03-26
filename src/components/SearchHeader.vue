<template>
  <header class="search-header">
    <div class="search-header__logo">
      <logo />
      <contribute-button />
    </div>
    <div class="search-header__filters">
      <dropdown class="badge" type="course" />
      <dropdown class="badge" type="event" />
      <dropdown class="badge" type="product" />
      <dropdown class="badge" type="content" />
      <input placeholder="pesquisar">
    </div>
  </header>
</template>

<script>
export default {
  name: 'search-header'
}
</script>

<style lang="scss" scoped>
.search-header {
  @extend %side-padding;

  &__logo, &__filters {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-top: 32px;

    &:last-child {
      align-items: center;

      & > .dropdown {
        margin: 0 8px;

        &:first-child {
          margin-left: 0;
        }
      }

      & > input {
        flex-grow: 1;
        margin-left: 30px;
        appearance: none;
        border: none;
        outline: none;
        font-size: 24px;
        line-height: 27px;
        color: #777;
        border-radius: 10px;
        padding: 8px 8px 8px 40px;
        background: {
          color: #F7F7F7;
          repeat: no-repeat;
          image: url("~@/assets/search.svg");
          size: 20px 20px;
          position: 10px center;
        }

        &::placeholder {
          color: #A8A8A8;
        }
      }
    }
  }

  @media screen and (max-width: 1200px) {
    &__logo > .contribute-button {
      display: none;
    }

    &__filters {
      display: none;
    }
  }
}
</style>
