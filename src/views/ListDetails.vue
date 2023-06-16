<template>
  <div class="list-details">
    <current-section-indicator />
    <div>
      <search-bar :placeholder="`Buscar em ${listId}`" />
      <activity-list :isSkeleton="loading" :activities="activities" showOptions />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import config from '@/config'

export default {
  name: 'list-details',
  computed: {
    ...mapGetters({ getActivities: 'lists/getActivities' }),
    ...mapState({ loading: state => !state.activities.loaded }),
    listId() {
      return this.$route.params.listId
    },
    activities() {
      return this.getActivities(this.listId)
    }
  },
  metaInfo() {
    return {
      title: 'Vai pa onde?',
      meta: [
        { vmid: 'description', name: 'description', content: config.defaultDescription },
        { vmid: 'og:description', name: 'og:description', content: config.defaultDescription }
      ],
      link: [
        { rel: 'canonical', href: `https://vaipaonde.netlify.app/listas/${this.listId}` }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.list-details {
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
