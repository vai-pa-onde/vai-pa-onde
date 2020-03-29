<template>
  <div :class="`activity-info-card type-background type-background--${type}`">
    <div class="activity-info-card__valid-until">
      <p class="label">válido até:</p>
      <p>{{ validUntil }}</p>
    </div>

    <a class="label link" :href="link" target="_blank">acessar</a>

    <div class="activity-info-card__share-desktop">
      <p class="label">compartilhar</p>
      <p class="share share--facebook" @click="shareOnFacebook">compartilhar no facebook</p>
      <a class="share share--whatsapp" :href="whatsappLink" data-action="share/whatsapp/share" target="_blank">compartilhar no whatsapp</a>
      <p class="share share--clipboard" @click="copyToClipboard">copiar link</p>
    </div>
    <share-button class="activity-info-card__share-mobile" />
  </div>
</template>

<script>
import { isMobile } from '@/js/deviceInfo'

export default {
  name: 'activity-info-card',
  props: {
    link: String,
    type: String,
    validUntil: String
  },
  computed: {
    whatsappLink() {
      if (isMobile()) {
        return `whatsapp://send?text=${this.link}`
      }

      return `https://web.whatsapp.com/send?text=${this.link}`
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
  }
}
</script>

<style lang="scss" scoped>
.activity-info-card {
  padding: 8px 24px;
  color: white;
  line-height: 1.25;
  font-size: 14px;
  height: 300px;
  flex-grow: 1;

  p, a {
    display: inline-flex;
    font-size: 1em;
  }

  .label {
    font-size: 1.35em;
    display: inline-flex;
    margin-top: 16px;
    margin-bottom: 2px;
    font-weight: bold;
    width: 100%;
  }

  a {
    color: inherit;
    text-decoration: none;

    &.link {
      &::after {
        content: '';
        width: 16px;
        height: 16px;
        margin-left: 5px;
        margin-top: 5px;
        background: {
          repeat: no-repeat;
          image: url('~@/assets/new-tab.svg');
          size: 100% 100%;
        }
      }
    }
  }

  &__share-desktop {
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

  @media screen and (max-width: 964px) {
    height: 250px;
    font-size: 12px;

    .label.link::after {
      margin-top: 3px;
    }
  }

  @media screen and (max-width: 768px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: auto;
    padding: 8px;

    .label {
      display: block;
      margin-top: 0;
    }

    & > .link {
      display: none;
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
}
</style>
