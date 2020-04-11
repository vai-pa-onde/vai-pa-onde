<template>
  <div class="activity-details" v-if="activity">
    <current-section-indicator />
    <div class="activity-details__container">
      <div class="activity-details__header">
        <h1>{{ activity.title }}</h1>
        <h2>{{ activity.brand }}</h2>
      </div>
      <div class="activity-details__content">
        <div class="activity-details__content__info">
          <img :class="`type-background type-background--${activity.type}`" :src="activity.image" alt />
          <div>
            <activity-info-card
              :id="activity.id"
              :title="activity.title"
              :type="activity.type"
              :link="activity.link"
              :validUntil="activity.validUntil"
            />
            <p>Publicado em: {{ activity.publishedAt }}</p>
          </div>
        </div>
        <div class="activity-details__content__cta-mobile">
          <p>Publicado em: {{ activity.publishedAt }}</p>
          <vpo-link dark :href="activity.link" text="acessar link" />
        </div>
        <p>{{ activity.description }}</p>
        <div class="activity-details__content__tags" v-if="activity.tags.length != 0">
          <p>tags:</p>
          <tag :key="i" v-for="(tag, i) in activity.tags" @click="searchTag" :text="tag" />
        </div>
      </div>
      <div class="activity-details__recommendations">
        <h3>Você também vai gostar de</h3>
        <activity-list inline :activities="recommendations" />
      </div>
    </div>
  </div>
  <div class="activity-details" v-else>
    <not-found-card>A ação que você estava procurando não existe ou foi removida =(</not-found-card>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'activity-details',
  data: () => ({
    activity: null,
    windowWidth: 0
  }),
  watch: {
    '$route.params.id': 'setActivity'
  },
  computed: {
    ...mapState({ activities: state => state.activities.allActivities }),
    ...mapGetters({ getActivityById: 'activities/getById', getRecommendations: 'activities/recommendations' }),
    recommendations() {
      let maxRecommendations
      if (this.windowWidth < 374) {
        maxRecommendations = 1
      } else if (this.windowWidth < 992) {
        maxRecommendations = 2
      } else if (this.windowWidth < 1264) {
        maxRecommendations = 3
      } else {
        maxRecommendations = 4
      }

      return this.getRecommendations(this.activity).slice(0, maxRecommendations)
    }
  },
  methods: {
    ...mapMutations({ addSearchTerm: 'search/addTerm', resetSearch: 'search/reset' }),
    setActivity() {
      this.activity = this.getActivityById(this.$route.params.id)
    },
    searchTag(evt) {
      this.resetSearch()
      this.addSearchTerm(evt.target.innerText)
      this.$router.push({ name: 'all-activities' })
    }
  },
  created() {
    this.setActivity()

    this.windowWidth = window.innerWidth
    window.addEventListener('resize', () => { this.windowWidth = window.innerWidth })
  }
}
</script>

<style lang="scss" scoped>
.activity-details {
  flex-grow: 1;
  color: #000000;
  margin-bottom: 64px;

  &__container {
    @extend %side-padding;
    padding-top: 24px;
  }

  &__header {
    margin-bottom: 24px;

    & > h1 {
      text-transform: uppercase;
      margin-bottom: 6px;
      font: {
        size: 36px;
        weight: bold;
      }
    }

    & > h2 {
      font-size: 36px;
    }
  }

  &__content {
    &__info {
      display: flex;
      margin-bottom: 18px;

      & > img {
        width: 650px;
        min-width: 650px;
        height: 360px;
        object-fit: cover;
      }

      & > div {
        width: 100%;

        & > p {
          padding: 12px;
          font-size: 14px;
        }
      }
    }

    &__cta-mobile {
      display: none;
    }

    & > p {
      font-size: 18px;
      line-height: 24px;
    }

    &__tags {
      display: inline-flex;
      flex-wrap: wrap;
      margin-top: 6px;

      & > p {
        font-weight: bold;
        align-self: center;
        margin-right: 4px;
        margin-bottom: 6px;
      }
    }
  }

  &__recommendations {
    display: flex;
    flex-direction: column;
    align-items: center;

    & > h3 {
      width: 100%;
      text-transform: uppercase;
      margin-top: 38px;
      font: {
        size: 24px;
        weight: 900;
      }
    }

    & > .activity-list {
      padding: 0;
      margin-bottom: 0;
    }
  }

  & > .not-found-card {
    margin: 42px auto;
  }

  @media screen and (max-width: 964px) {
    &__header {
      & > h1 {
        font-size: 24px;
      }

      & > h2 {
        font-size: 18px;
      }
    }

    &__content {
      &__info {
        & > img {
          width: 480px;
          min-width: 480px;
          height: 300px;
        }
      }
    }
  }

  @media screen and (max-width: 768px) {
    &__content {
      &__info {
        flex-direction: column;
        margin-bottom: 12px;

        & > img {
          min-width: unset;
          width: 100%;
          height: auto;
        }

        & > div > p {
          display: none;
        }
      }

      &__cta-mobile {
        display: flex;

        & > p {
          font-size: 12px;
          margin-right: 8px;
        }

        & > .button {
          width: min-content;
          margin-left: auto;
          margin-bottom: 20px;
          font-size: 18px;
        }
      }
    }

    &__recommendations {
      & > h3 {
        font-size: 18px;
      }

      & > .activity-list {
        margin-top: 18px;
      }
    }
  }
}
</style>
