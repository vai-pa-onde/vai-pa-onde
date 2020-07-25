<template>
  <cta-card class="list-card" :to="{ name: 'list-details', params: { listId: id } }" :numberOfActivities="numberOfActivities">
    <template v-slot:content>
      <h2>{{ id }}</h2>
    </template>
  </cta-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'list-card',
  props: {
    id: String
  },
  computed: {
    ...mapGetters({ listById: 'lists/getById' }),
    numberOfActivities() {
      return this.listById(this.id).length
    }
  }
}
</script>

<style lang="scss">
.list-card {
  h2 {
    margin-bottom: 6rem;
  }
}
</style>
