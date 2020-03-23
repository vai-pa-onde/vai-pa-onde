<template>
  <div class="activity-details">
    <div class="activity-details__content">
      <div class="activity-details__content__header">
        <div>
          <h1>{{ activity.title }}</h1>
          <h2>{{ activity.brand }}</h2>
        </div>
        <type-badge :class="`type-background type-background--${activity.type}`" :type="activity.type" />
      </div>
      <div :class="`activity-details__content__info`">
        <img :src="activity.image" alt />
        <div :class="`type-background type-background--${activity.type}`">
          <p class="label">válido até:</p>
          <p>30 de março, 2020</p>

          <a class="label" :href="activity.link" target="_blank">acessar</a>

          <p class="label">compartilhar</p>
          <p class="share share--facebook" @click="copyToClipboard">compartilhar no facebook</p>
          <p class="share share--instagram">compartilhar no instagram</p>
          <a class="share share--whatsapp" :href="whatsappLink" data-action="share/whatsapp/share" target="_blank">compartilhar no whatsapp</a>
          <p class="share share--clipboard" @click="copyToClipboard">copiar link</p>
        </div>
      </div>
      <p>{{ activity.description }}</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { isMobile } from '@/js/deviceInfo'

export default {
  name: 'activity-details',
  data: () => ({
    activity: null
  }),
  computed: {
    ...mapState({ activities: state => state.activities.allActivities }),
    whatsappLink() {
      const text = this.activity.link
      if (isMobile()) {
        return `whatsapp://send?text=${text}`
      }

      return `https://web.whatsapp.com/send?text=${text}`
    }
  },
  methods: {
    copyToClipboard() {
      const el = document.createElement('textarea')
      el.value = this.activity.link
      el.setAttribute('readonly', '')
      el.style.position = 'absolute'
      el.style.left = '-9999px'

      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')

      document.body.removeChild(el)
    }
  },
  created() {
    this.activity = this.activities[this.$route.params.id]
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

  &__content {
    width: 900px;
    max-width: 900px;

    &__header {
      display: flex;
      align-items: flex-start;

      & > div:first-child {
        flex-grow: 1;

        & > h1 {
          text-transform: uppercase;
          font: {
            size: 36px;
            weight: bold;
          }
        }

        & > h2 {
          font-size: 36px;
        }
      }

      & > .type-badge {
        font-size: 22px;
        color: white;
      }
    }

    &__info {
      display: flex;
      margin-bottom: 18px;

      & > img {
        width: 650px;
        min-width: 650px;
        height: 360px;
        margin-top: 24px;
        object-fit: cover;
      }

      & > div {
        padding: 8px 24px;
        color: white;
        line-height: 1.25;
        height: 300px;
        flex-grow: 1;

        & > p {
          font-size: 16px;

          &.share {
            cursor: pointer;
          }
        }

        & > .label {
          font-size: 19px;
          display: block;
          margin-top: 16px;
          margin-bottom: 2px;
          font-weight: bold;
        }

        & > a {
          width: min-content;
          color: inherit;
          text-decoration: none;
        }
      }
    }

    & > p {
      font-size: 18px;
      line-height: 24px;
    }
  }
}
</style>
