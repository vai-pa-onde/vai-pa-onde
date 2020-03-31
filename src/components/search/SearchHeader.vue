<template>
  <header class="search-header">
    <div class="search-header__logo">
      <drawer v-model="isDrawerOpen">
        <div class="drawer-content">
          <h1>Categorias</h1>
          <div class="drawer-content__dropdowns">
            <dropdown @selected="closeDrawer" class="badge" type="course" :selected="selectedSubtype" />
            <dropdown @selected="closeDrawer" class="badge" type="event" :selected="selectedSubtype" />
            <dropdown @selected="closeDrawer" class="badge" type="product" :selected="selectedSubtype" />
            <dropdown @selected="closeDrawer" class="badge" type="content" :selected="selectedSubtype" />
          </div>
          <vpo-button @click="$router.push({ name: 'about' })" dark outlined text="sobre" />
          <vpo-link :href="formUrl" text="contribuir" />
        </div>
      </drawer>
      <logo />
      <div class="search-header__logo__links">
        <vpo-button @click="$router.push({ name: 'about' })" dark outlined text="sobre" />
        <vpo-link :href="formUrl" text="contribuir" />
      </div>
    </div>
    <div class="search-header__filters">
      <div class="search-header__filters__navigation">
        <dropdown class="badge" type="course" :selected="selectedSubtype" />
        <dropdown class="badge" type="event" :selected="selectedSubtype" />
        <dropdown class="badge" type="product" :selected="selectedSubtype" />
        <dropdown class="badge" type="content" :selected="selectedSubtype" />
      </div>
      <input :value="searchString" @input="searchChanged" placeholder="pesquisar">
    </div>
  </header>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import config from '@/config'

export default {
  name: 'search-header',
  data: () => ({
    isDrawerOpen: false,
    searchUpdateTimeout: null
  }),
  computed: {
    ...mapState({ searchString: state => state.activities.searchString }),
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
    align-items: center;
    justify-content: space-between;
    margin-top: 32px;
  }

  &__logo {
    & > .drawer {
      display: none;
    }

    &__links > .button {
      margin-left: 12px;
    }
  }

  &__filters {
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
            font: {
              size: 18px;
              weight: bold;
            }
          }

          &__dropdowns {
            margin: 36px 0 30px 0;

            & > .dropdown {
              margin: 4px 0;
              width: 100%;
            }
          }

          & > .button {
            margin: 6px 20px;
            font-size: 18px;
          }
        }
      }

      &__links {
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
