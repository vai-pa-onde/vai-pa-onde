<template>
  <header class="search-header">
    <div class="search-header__logo">
      <drawer v-model="isDrawerOpen">
        <div class="drawer-content">
          <h1>Categorias</h1>
          <dropdown @selected="closeDrawer" class="badge" type="course" :selected="selectedSubtype" />
          <dropdown @selected="closeDrawer" class="badge" type="event" :selected="selectedSubtype" />
          <dropdown @selected="closeDrawer" class="badge" type="product" :selected="selectedSubtype" />
          <dropdown @selected="closeDrawer" class="badge" type="content" :selected="selectedSubtype" />
          <vpo-button :href="formUrl" text="contribuir" />
        </div>
      </drawer>
      <logo />
      <vpo-button :href="formUrl" text="contribuir" />
    </div>
    <div class="search-header__filters">
      <div class="search-header__filters__navigation">
        <dropdown class="badge" type="course" :selected="selectedSubtype" />
        <dropdown class="badge" type="event" :selected="selectedSubtype" />
        <dropdown class="badge" type="product" :selected="selectedSubtype" />
        <dropdown class="badge" type="content" :selected="selectedSubtype" />
      </div>
      <input @input="searchChanged" placeholder="pesquisar">
    </div>
  </header>
</template>

<script>
import { mapActions } from 'vuex'
import config from '@/config'

export default {
  name: 'search-header',
  data: () => ({
    isDrawerOpen: false,
    searchUpdateTimeout: null
  }),
  computed: {
    formUrl() {
      return config.contributeFormUrl
    },
    selectedSubtype() {
      return this.$route.params.subtype
    }
  },
  methods: {
    ...mapActions({ doSearch: 'activities/doSearch' }),
    searchChanged(evt) {
      clearTimeout(this.searchUpdateTimeout)
      this.searchUpdateTimeout = setTimeout(() => this.doSearch(evt.target.value), 200)
    },
    closeDrawer() {
      this.isDrawerOpen = false
    }
  }
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
  }

  &__logo > .drawer {
    display: none;
  }

  &__filters {
    align-items: center;

    &__navigation {
      display: inline-flex;

      & > .dropdown {
        margin: 0 8px;

        &:first-child {
          margin-left: 0;
        }
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

  @media screen and (max-width: 964px) {
    &__filters {
      flex-direction: column;

      &__navigation {
        width: 100%;
        margin-bottom: 14px;

        & > .dropdown {
          flex: 1;

          &:first-child {
            margin-left: 0;
          }

          &:last-child {
            margin-right: 0;
          }
        }
      }

      & > input {
        margin-left: 0;
        width: 100%;
      }
    }
  }

  @media screen and (max-width: 654px) {
    &__logo, &__filters {
      margin-top: 14px;
    }

    &__logo {
      align-items: center;

      & > .drawer {
        display: block;

        .drawer-content {
          display: flex;
          flex-direction: column;

          & > h1 {
            background-color: black;
            color: white;
            width: 100%;
            padding: 16px 24px;
            text-align: center;
            text-transform: uppercase;
            margin-bottom: 36px;
            font: {
              size: 18px;
              weight: bold;
            }
          }

          & > .dropdown {
            margin: 4px 0;
            width: 100%;
          }

          & > .vpo-button {
            margin: 36px 20px;
          }
        }
      }

      & > .vpo-button {
        display: none;
      }
    }

    &__filters {
      &__navigation {
        display: none;
      }

      & > input {
        margin-left: 0;
      }
    }
  }
}
</style>
