<template>
  <div class="shared-list-details">
    <current-section-indicator />
    <div>
      <search-bar :placeholder="`Buscar em ${sharedList.name}`" />
      <activity-list :isSkeleton="loading" :activities="activities || []" showOptions />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import config from '@/config'

export default {
  name: 'shared-list-details',
  data: () => ({
    sharedList: {}
  }),
  computed: {
    ...mapGetters({ getActivities: 'lists/getSharedListActivities' }),
    ...mapState({ loading: state => !state.activities.loaded }),
    activities() {
      return this.getActivities(this.sharedList.activities)
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
        { name: 'robots', content: `noindex` }
      ]
    }
  },
  created() {
    if (!this.$route.query.list) {
      this.$router.replace({ name: 'home' })
    }

    const listString = atob(this.$route.query.list)
    this.sharedList = JSON.parse(listString)
  }
}
</script>

<style lang="scss" scoped>
.shared-list-details {
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
