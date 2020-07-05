<template>
  <div class="search-bar">
    <div class="search-bar__search">
      <span :class="type ? `type-background type-background--${type}` : ''"/>
      <input v-model="currentTerm" :placeholder="placeholder" @keyup.enter="doSearch">
    </div>
    <div class="search-bar__tags">
      <tag :key="term" v-for="term in searchTerms" :text="term" dismissable @dismiss="() => removeSearchTerm(term)" />
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
  name: 'search-bar',
  data: () => ({
    currentTerm: ''
  }),
  props: {
    type: String,
    placeholder: String
  },
  computed: {
    ...mapState({ searchTerms: state => state.search.terms })
  },
  methods: {
    ...mapMutations({ addSearchTerm: 'search/addTerm', removeSearchTerm: 'search/removeTerm' }),
    doSearch() {
      this.addSearchTerm(this.currentTerm)
      this.currentTerm = ''
    }
  },
  created() {
    if (this.$route.query.search) {
      this.$route.query.search.split(' ')
        .map(it => it.trim())
        .filter(it => !!it)
        .forEach(it => this.addSearchTerm(it))
    }
  }
}
</script>

<style lang="scss">
.search-bar {
  @extend %side-padding;
  margin-top: 14px;
  width: 100%;

  &__search {
    display: flex;
    border-radius: 8px;
    overflow: hidden;

    & > span {
      width: 5px;

      &:not(.type-background) {
        background-color: black;
      }
    }

    & > input {
      appearance: none;
      outline: none;
      border: none;
      font-size: 16px;
      line-height: 19px;
      color: #777;
      padding: 8px 8px 8px 32px;
      flex-grow: 1;
      background: {
        color: white;
        repeat: no-repeat;
        image: url("~@/assets/search.svg");
        size: 16px 16px;
        position: 8px center;
      }

      &::placeholder {
        color: #A8A8A8;
      }
    }
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    margin-top: 8px;
  }
}
</style>
