<template>
  <header class="search-header">
    <div class="search-header__logo">
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
    &__logo {
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
