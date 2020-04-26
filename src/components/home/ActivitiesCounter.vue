<template>
  <component
    v-if="data.counter != 0"
    :is="routeTo ? 'router-link' : 'div'"
    :to="routeTo"
    class="activities-counter"
  >
    <h1>{{ data.counter }}</h1>
    <div class="activities-counter__content">
      <p>{{ data.counter > 1 ? 'Ações' : 'Ação' }}</p>
      <h2>{{ data.subtitle }}</h2>
    </div>
  </component>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'activities-counter',
  props: {
    routeTo: Object,
    type: {
      type: String,
      validator: s => ['published', 'valid']
    }
  },
  computed: {
    ...mapState({ activities: state => state.activities.allActivities }),
    publishedToday() {
      const today = new Date()
      return this.activities.filter(it => this.filterDate(today, it.publishedAtDate)).length
    },
    validUntilToday() {
      const today = new Date()
      return this.activities.filter(it => this.filterDate(today, it.validUntilDate)).length
    },
    data() {
      return {
        published: {
          counter: this.publishedToday,
          subtitle: 'Adicionadas hoje'
        },
        valid: {
          counter: this.validUntilToday,
          subtitle: 'Vencendo hoje'
        }
      }[this.type]
    }
  },
  methods: {
    filterDate(today, date) {
      return date !== null &&
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getYear() === today.getYear()
    }
  }
}
</script>

<style lang="scss" scoped>
.activities-counter {
  border-radius: 8px;
  overflow: hidden;
  text-decoration: none;

  & > h1 {
    width: 100%;
    padding: 8px;
    text-align: center;
    background-color: map-get($colors-util, 'blue');
    color: white;
    font: {
      size: 40px;
      weight: bold;
    }
  }

  &__content {
    background-color: white;
    padding: 6px;
    text-align: center;

    & > p {
      margin-bottom: 6px;
      color: black;
      font: {
        size: 14px;
        weight: 500;
      }
    }

    & > h2 {
      color: black;
      font: {
        size: 16px;
        weight: bold;
      }
    }
  }

  @include breakpoint('medium') {
    display: flex;

    & > h1 {
      width: auto;
      background-color: white;
      color: black;
      padding: 20px 12px 20px 32px;
    }

    &__content {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      justify-content: center;
      text-align: left;
      padding: 0 24px;
    }
  }

  @include breakpoint('large') {
    & > h1 {
      font-size: 50px;
    }

    &__content {
      & > p, & > h2 {
        font-size: 18px;
      }
    }
  }

  @include breakpoint('extra-large') {
    & > h1 {
      font-size: 64px;
    }
  }
}
</style>
