<template>
  <div class="lists">
    <current-section-indicator />
    <div>
      <list-layout :isSkeleton="loading" :activities="favorites" showOptions>
        <template v-slot:skeleton="{ }">
        </template>
        <template v-slot:item="{ }">
        </template>
      </list-layout>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import config from '@/config'

export default {
  name: 'lists',
  computed: {
    ...mapGetters({ favorites: 'search/favorites' }),
    ...mapState({ loading: state => !state.activities.loaded })
  },
  metaInfo() {
    return {
      title: 'Vai pa onde? | Minhas listas',
      meta: [
        { vmid: 'description', name: 'description', content: config.defaultDescription },
        { vmid: 'og:description', name: 'og:description', content: config.defaultDescription }
      ],
      link: [
        { rel: 'canonical', href: 'https://vaipaonde.com.br/listas' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.lists {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: center;
  background-color: map-get($colors-util, 'light-gray');
  margin-top: 16px;

  & > .separator-bar {
    margin-top: 0;
  }

  @include breakpoint('large') {
    margin-top: 32px;;
  }
}
</style>
