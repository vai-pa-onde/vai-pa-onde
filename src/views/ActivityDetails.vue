<template>
  <div class="activity-details" v-if="activity">
    <current-section-indicator />
    <div class="activity-details__container">
      <div class="activity-details__content">
        <div class="activity-details__content__info">
          <div>
            <h1>{{ activity.title }}</h1>
            <h2>{{ activity.brand }}</h2>
            <subtype-badge :type="activity.type" :subtype="activity.subtype" />
            <p>{{ activity.description }}</p>
          </div>
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
  },
  metaInfo() {
    if (!this.activity) {
      return {}
    }

    const publishedAt = this.activity.publishedAtDate.toISOString()
    const description = this.activity.description.length <= 160 ? this.activity.description : this.activity.description.substring(0, 157) + '...'
    const url = `https://vaipaonde.com.br/acao/${this.activity.id}`

    return {
      title: `Vai pa onde? | ${this.activity.title}`,
      meta: [
        { vmid: 'description', name: 'description', content: description },
        { vmid: 'og:description', name: 'og:description', content: description }
      ],
      link: [
        { rel: 'canonical', href: url }
      ],
      script: [
        {
          type: 'application/ld+json',
          innerHTML: `{
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "${url}"
            },
            "headline": "${this.activity.title}",
            "description": "${description}",
            "image": [
              "https://vaipaonde.com.br/images/logo-large.png"
            ],
            "author": {
              "@type": "Organization",
              "name": "Vai pa onde"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Vai pa onde",
              "logo": {
                "@type": "ImageObject",
                "url": "https://vaipaonde.com.br/images/android-chrome-192x192",
                "width": 60,
                "height": 60
              }
            },
            "datePublished": "${publishedAt}",
            "dateModified": "${publishedAt}"
          }`
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.activity-details {
  flex-grow: 1;
  color: #000000;

  &__container {
    @extend %side-padding;
    padding-top: 24px;
    padding-bottom: 64px;
    background-color: map-get($colors-util, 'light-gray');
  }

  &__content {
    &__info {
      display: flex;
      margin-bottom: 18px;

      & > div:first-child {
        width: 650px;
        min-width: 650px;
        min-height: 100%;
        padding: 24px;
        background-color: white;

        & > h1 {
          text-transform: uppercase;
          margin-bottom: 6px;
          font: {
            size: 46px;
            weight: 900;
          }
        }

        & > h2 {
          font-size: 32px;
        }

        & > .subtype-badge {
          margin: 12px 0 24px 0;
        }

        & > p {
          font-size: 16px;
          line-height: 1.4;
          white-space: pre-line;
        }
      }

      & > div:last-child {
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
      text-align: center;
      font: {
        size: 24px;
        weight: bold;
      }
    }

    & > .activity-list {
      padding: 0;
      margin-bottom: 0;
    }
  }

  & > .not-found-card {
    margin: 42px 20px;
    background-color: map-get($colors-util, 'light-gray');
  }

  @media screen and (min-width: 840px) {
    & > .not-found-card {
      margin: 42px auto;
    }
  }

  @media screen and (max-width: 964px) {
    &__content {
      &__info {
        & > div:first-child {
          width: 480px;
          min-width: 480px;

          & > h1 {
            font-size: 36px;
          }

          & > h2 {
            font-size: 28px;
          }
        }
      }
    }
  }

  @media screen and (max-width: 768px) {
    &__content {
      &__info {
        flex-direction: column;
        margin-bottom: 12px;

        & > div:first-child {
          min-width: unset;
          width: 100%;
          height: auto;
          padding: 16px;

          & > h1 {
            font-size: 32px;
          }

          & > h2 {
            font-size: 24px;
          }
        }

        & > div:last-child > p {
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
