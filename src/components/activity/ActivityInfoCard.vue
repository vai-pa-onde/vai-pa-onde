<template>
  <div class="activity-info-card">
    <div class="activity-info-card__content">
      <vpo-link outlined :href="link" text="accessar" />

      <div class="activity-info-card__content__valid-until">
        <p class="label">válido até:</p>
        <p>{{ validUntil }}</p>
      </div>

      <div class="activity-info-card__content__share-desktop">
        <p class="label">compartilhar via</p>
        <p class="share share--facebook" @click="shareOnFacebook">facebook</p>
        <a class="share share--whatsapp" :href="whatsappLink" data-action="share/whatsapp/share" target="_blank">whatsapp</a>
        <p class="share share--clipboard" @click="copyToClipboard">link</p>
      </div>
      <share-button class="activity-info-card__content__share-mobile" :activityId="id" :activityTitle="title" />
    </div>
    <span :class="`activity-info-card__decoration type-background type-background--${type}`" />
  </div>
</template>

<script>
import { isMobile } from '@/js/deviceInfo'

export default {
  name: 'activity-info-card',
  props: {
    id: String,
    title: String,
    link: String,
    type: String,
    validUntil: String
  },
  computed: {
    pageLink() {
      return `https://www.vaipaonde.com.br/acao/${this.id}`
    },
    whatsappLink() {
      if (isMobile()) {
        return `whatsapp://send?text=${this.pageLink}`
      }

      return `https://web.whatsapp.com/send?text=${this.pageLink}`
    }
  },
  methods: {
    shareOnFacebook() {
      window.open(`https://www.facebook.com/sharer/sharer.php?app_id=2952570301453352&sdk=joey&u=${encodeURIComponent(this.pageLink)}&display=popup&ref=plugin&src=share_button`, 'Facebook', 'width=640,height=580')
    },
    copyToClipboard() {
      const el = document.createElement('textarea')
      el.value = this.pageLink
      el.setAttribute('readonly', '')
      el.style.position = 'absolute'
      el.style.left = '-9999px'

      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')

      document.body.removeChild(el)
    }
  }
}
</script>

<style lang="scss" scoped>
.activity-info-card {
  display: flex;
  color: white;
  height: 300px;
  line-height: 1.25;
  font-size: 14px;
  flex-grow: 1;

  &__content {
    padding: 16px 24px;
    background-color: black;
    flex-grow: 1;

    p, a {
      display: inline-flex;
      font-size: 1em;
      margin-bottom: 6px;
    }

    .label {
      font-size: 1.35em;
      display: inline-flex;
      margin-top: 16px;
      margin-bottom: 4px;
      font-weight: bold;
      width: 100%;
    }

    a:not(.button) {
      color: inherit;
      text-decoration: none;
    }

    &__share-desktop {
      display: flex;
      flex-direction: column;

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
    }

    &__share-mobile {
      display: none;
    }
  }

  &__decoration {
    display: block;
    min-width: 22px;
  }

  @media screen and (max-width: 964px) {
    height: 250px;

    &__content {
      font-size: 12px;
    }
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
    height: auto;

    &__content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: auto;
      padding: 8px;

      & > .vpo-link {
        display: none;
      }

      .label {
        display: block;
        margin-top: 0;
      }

      &__share-desktop {
        display: none;
      }

      &__share-mobile.share-button {
        display: block;
        height: 24px;
        width: 24px;
      }
    }

    &__decoration {
      height: 8px;
    }
  }
}
</style>
