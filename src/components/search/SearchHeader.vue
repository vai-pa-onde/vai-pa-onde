<template>
  <header class="search-header">
    <div class="search-header__logo">
      <drawer v-model="isDrawerOpen"/>
      <logo />
      <p>O portal com <b>tudo para você ficar em casa.</b></p>

      <div class="search-header__logo__links">
        <vpo-button @click="$router.push({ name: 'about' })" dark outlined text="sobre" />
        <suggestion-modal />
        <favorites-button />
      </div>
    </div>
    <div class="search-header__navigation">
      <dropdown :key="type" v-for="type in types" class="badge" :type="type" :selected="selectedSubtype" />
      <div class="search-header__navigation__links">
        <router-link :to="{ name: 'all-activities' }" class="badge">Tudo</router-link>
        <favorites-button />
      </div>
    </div>
  </header>
</template>

<script>
import { mapActions, mapState } from 'vuex'
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

  &__logo, &__navigation {
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

      & > * {
        margin-left: 12px;
      }

      & > .favorites-button {
        display: none;
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

  &__navigation {
    display: inline-flex;
    width: 100%;

    & > .dropdown {
      margin: 0 8px;

      &:first-child {
        margin-left: 0;
      }
    }

    &__links {
      display: flex;
      width: 100%;

      & > a:not(.favorites-button) {
        display: flex;
        align-items: center;
        background-color: rgba(black, 0.25);
        text-decoration: none;
        color: black;
        margin: 0 8px;
        font: {
          family: 'Play';
          size: 16px;
          weight: 900;
        };
      }
    }
  }

  @media screen and (max-width: 975px) {
    &__logo__links {
      .favorites-button {
        display: flex;
      }
    }

    &__navigation__links {
      width: auto;
      margin-right: auto;

      & > .favorites-button {
        display: none;
      }
    }
  }

  @media screen and (max-width: 975px) {
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
  }

  @media screen and (max-width: 768px) {
    &__logo, &__navigation {
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

    &__navigation {
      display: none;
    }
  }
}
</style>
