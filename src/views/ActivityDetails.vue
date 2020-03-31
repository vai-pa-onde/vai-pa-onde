<template>
  <div class="activity-details" v-if="activity">
    <div class="activity-details__header">
      <h1>{{ activity.title }}</h1>
      <h2>{{ activity.brand }}</h2>
    </div>
    <div class="activity-details__subheader">
      <div>
        <type-badge :class="`type-background type-background--${activity.type}`" :type="activity.type" />
        <subtype-badge :class="`type-background type-background--${activity.type}`" :subtype="activity.subtype" />
        <p>Publicado em {{ activity.publishedAt }}</p>
      </div>
      <vpo-link dark :href="activity.link" text="acessar link" />
    </div>
    <div class="activity-details__content">
      <div class="activity-details__content__info">
        <img :class="`type-background type-background--${activity.type}`" :src="activity.image" alt />
        <activity-info-card
          :id="activity.id"
          :title="activity.title"
          :type="activity.type"
          :link="activity.link"
          :validUntil="activity.validUntil"
        />
      </div>
      <vpo-link dark :href="activity.link" text="acessar link" />
      <p>{{ activity.description }}</p>
      <div class="activity-details__content__tags" v-if="activity.tags.length != 0">
        <p>tags:</p>
        <router-link :key="i" v-for="(tag, i) in activity.tags" :to="{ name: 'home' }" @click.native="searchTag">
          {{ tag }}
        </router-link>
      </div>
    </div>
    <div class="activity-details__recommendations">
      <h3>Você também vai gostar de</h3>
      <activity-list inline :activities="recommendations" />
    </div>
  </div>
  <div class="activity-details" v-else>
    <not-found-card>A ação que você estava procurando não existe ou foi removida =(</not-found-card>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

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
    ...mapActions({ doSearch: 'activities/doSearch' }),
    setActivity() {
      this.activity = this.getActivityById(this.$route.params.id)
    },
    searchTag(evt) {
      this.doSearch(evt.target.innerText)
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
  @extend %side-padding;
  flex-grow: 1;
  color: #000000;
  margin-top: 42px;
  margin-bottom: 64px;

  &__header {
    margin-bottom: 8px;
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

  &__subheader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 22px;

    & > div {
      display: flex;
      align-items: center;
      flex-wrap: wrap;

      & > .type-badge {
        font-size: 22px;
        line-height: 22px;
        margin-right: 8px;
        color: white;
      }

      & > .subtype-badge {
        margin-right: auto;
        margin-top: 10px;
        margin-bottom: 10px;
        margin-right: 18px;
      }
    }
  }

  &__content {
    width: 900px;
    max-width: 900px;

    &__info {
      display: flex;
      margin-bottom: 18px;

      & > img {
        width: 650px;
        min-width: 650px;
        height: 360px;
        object-fit: cover;
      }
    }

    & > .button {
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

      & > a {
        white-space: nowrap;
        text-decoration: none;
        color: map-get($colors-util, 'blue');
        background-color: rgba(map-get($colors-util, 'blue'), 0.15);
        border-radius: 4px;
        padding: 3px 5px;
        margin-left: 4px;
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
      width: 704px;
      max-width: 704px;

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
    &__subheader {
      & > div {
        width: 100%;

        & > .subtype-badge {
          margin-right: auto;
        }
      }

      & > .button {
        display: none;
      }
    }

    &__content {
      width: auto;
      max-width: 100%;

      &__info {
        flex-direction: column;
        margin-bottom: 12px;

        & > img {
          min-width: unset;
          width: 100%;
          height: auto;
        }
      }

      & > .button {
        display: block;
        width: min-content;
        margin-left: auto;
        margin-bottom: 20px;
        font-size: 18px;
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

  @media screen and (max-width: 576px) {
    &__subheader > div {
      & > .type-badge {
        font-size: 16px;
        line-height: 22px;
        color: white;
      }

      & > p {
        font-size: 14px;
      }
    }
  }
}
</style>
