<template>
  <header class="search-header">
    <div class="search-header__logo">
      <drawer v-model="isDrawerOpen"/>
      <logo />
      <p>O portal com <b>tudo para você ficar em casa.</b></p>

      <div class="search-header__logo__links">
        <vpo-button @click="$router.push({ name: 'about' })" dark outlined text="sobre" />
        <vpo-link :href="formUrl" dark text="mandar uma ação" />
      </div>
    </div>
    <div class="search-header__filters">
      <div class="search-header__filters__navigation">
        <dropdown :key="type" v-for="type in types" class="badge" :type="type" :selected="selectedSubtype" />
      </div>
      <input :value="searchString" @input="searchChanged" placeholder="pesquisar">
    </div>
  </header>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import config from '@/config'
import typeName from '@/js/typeName'

export default {
  name: 'search-header',
  data: () => ({
    isDrawerOpen: false,
    searchUpdateTimeout: null
  }),
  computed: {
    ...mapState({ searchString: state => state.activities.searchString }),
    types() {
      return Object.keys(typeName)
    },
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

    &__links {
      display: flex;

      & > .button {
        margin-left: 12px;
      }
    }

    & > p {
      color: black;
      font-size: 20px;
      margin: 0 12px;
      margin-right: auto;

      & > b {
        font-weight: bold;
      }
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
    &__logo {
      flex-wrap: wrap;

      & > p {
        order: 3;
        font-size: 18px;
        margin: 16px 0 0 0;
        width: 100%;
        text-align: center;
      }

      &__links {
        order: 2;
      }
    }

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
      }

      & > p {
        font-size: 16px;
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
