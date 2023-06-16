<template>
  <div class="favorites">
    <current-section-indicator />
    <div>
      <search-bar :placeholder="`Buscar em minhas favoritas`" type="favorites" />
      <activity-list :isSkeleton="loading" :activities="favorites" showOptions />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import config from '@/config'

export default {
  name: 'favorites-list',
  computed: {
    ...mapGetters({ favorites: 'search/favorites' }),
    ...mapState({ loading: state => !state.activities.loaded })
  },
  metaInfo() {
    return {
      title: 'Vai pa onde?',
      meta: [
        { vmid: 'description', name: 'description', content: config.defaultDescription },
        { vmid: 'og:description', name: 'og:description', content: config.defaultDescription }
      ],
      link: [
        { rel: 'canonical', href: 'https://vaipaonde.netlify.app/favoritos' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.favorites {
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
