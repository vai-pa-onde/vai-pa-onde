<template>
  <div class="all-activities">
    <current-section-indicator />
    <activity-list :activities="activities" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'all-activities',
  computed: mapGetters({ activities: 'activities/all' })
}
</script>

<style lang="scss" scoped>
.all-activities {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: center;
}
</style>
