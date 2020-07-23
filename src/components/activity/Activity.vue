<template>
  <router-link
    class="activity"
    :to="{ name: 'activity-details', params: { id } }"
  >
    <img :src="require(`@/assets/activity/${type}.svg`)" alt :class="`type-background type-background--${type}`" />
    <type-badge class="activity__type" :type="type" />
    <div :class="`activity__content type-background type-background--${type}`">
      <div class="activity__content__header">
        <h1>{{ title }}</h1>
        <div>
          <toggle-favorite-button :id="id" />
          <add-to-list-modal :activityId="id" />
        </div>
      </div>
      <p>{{ brand }}</p>
    </div>
    <div :class="`activity__date type-background type-background--${type}`" v-if="validUntilDate">
      <div>até {{ validUntil }}</div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'activity',
  props: {
    id: String,
    title: String,
    brand: String,
    type: String,
    validUntilDate: Date
  },
  computed: {
    validUntil() {
      const day = this.validUntilDate.getDate().toString().padStart(2, '0')
      const month = (this.validUntilDate.getMonth() + 1).toString().padStart(2, '0')

      return `${day}.${month}`
    }
  }
}
</script>
