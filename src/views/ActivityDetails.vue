<template>
  <div class="activity-details">
    <div class="activity-details__header">
      <h1>{{ activity.title }}</h1>
      <h2>{{ activity.brand }}</h2>
    </div>
    <div class="activity-details__subheader">
      <div>
        <type-badge :class="`type-background type-background--${activity.type}`" :type="activity.type" />
        <subtype-badge :class="`type-background type-background--${activity.type}`" :type="activity.subtype" />
        <p>Publicado em 22 de março de 2020</p>
      </div>
      <vpo-button dark :href="activity.link" text="acessar link" />
    </div>
    <div class="activity-details__content">
      <div class="activity-details__content__info">
        <img :src="activity.image" alt />
        <div :class="`type-background type-background--${activity.type}`">
          <p class="label">válido até:</p>
          <p>30 de março, 2020</p>

          <a class="label link" :href="activity.link" target="_blank">acessar</a>

          <p class="label">compartilhar</p>
          <p class="share share--facebook" @click="shareOnFacebook">compartilhar no facebook</p>
          <a class="share share--whatsapp" :href="whatsappLink" data-action="share/whatsapp/share" target="_blank">compartilhar no whatsapp</a>
          <p class="share share--clipboard" @click="copyToClipboard">copiar link</p>
        </div>
      </div>
      <p>{{ activity.description }}</p>
      <div class="activity-details__content__tags" v-if="tags.length != 0">
        <p>tags:</p>
        <span :key="i" v-for="(tag, i) in tags">{{ tag }}</span>
      </div>
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
    },
    tags() {
      return this.activity.tags.split(',').map(it => it.trim())
    }
  },
  methods: {
    shareOnFacebook() {
      window.open(`https://www.facebook.com/sharer/sharer.php?app_id=2952570301453352&sdk=joey&u=${encodeURIComponent('https://www.vaipaonde.com.br')}&display=popup&ref=plugin&src=share_button`, 'Facebook', 'width=640,height=580')
    },
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

  &__header {
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

  &__subheader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 12px 0 32px 0;

    & > div:first-child {
      display: flex;
      align-items: center;

      & > .type-badge {
        font-size: 22px;
        color: white;
      }

      & > .subtype-badge {
        margin: 0 24px 0 12px;
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

      & > div {
        padding: 8px 24px;
        color: white;
        line-height: 1.25;
        height: 300px;
        flex-grow: 1;

        & > p, & > a {
          display: inline-flex;
          font-size: 14px;
        }

        & > .share {
          align-items: center;
          cursor: pointer;

          &::before {
            content: '';
            width: 14px;
            height: 14px;
            margin-right: 10px;
            margin-top: 1px;
            background: {
              repeat: no-repeat;
              size: 100% 100%;
            }
          }

          &--facebook::before {
            background-image: url('~@/assets/facebook.svg');
          }

          &--instagram::before {
            background-image: url('~@/assets/instagram.svg');
          }

          &--whatsapp::before {
            background-image: url('~@/assets/whatsapp.svg');
          }

          &--clipboard::before {
            background-image: url('~@/assets/link.svg');
          }
        }

        & > .label {
          font-size: 19px;
          display: inline-flex;
          margin-top: 16px;
          margin-bottom: 2px;
          font-weight: bold;
        }

        & > a {
          color: inherit;
          text-decoration: none;

          &.link {
            &::after {
              content: '';
              width: 16px;
              height: 16px;
              margin-left: 5px;
              margin-top: 4px;
              background: {
                repeat: no-repeat;
                image: url('~@/assets/new-tab.svg');
                size: 100% 100%;
              }
            }
          }
        }
      }
    }

    & > p {
      font-size: 18px;
      line-height: 24px;
    }

    &__tags {
      display: inline-flex;
      flex-wrap: wrap;

      & > p {
        font-weight: bold;
        align-self: center;
        margin-right: 4px;
      }

      & > span {
        white-space: nowrap;
        color: map-get($colors-util, 'blue');
        background-color: rgba(map-get($colors-util, 'blue'), 0.15);
        border-radius: 4px;
        padding: 3px 5px;
        margin-left: 4px;
      }
    }
  }
}
</style>
