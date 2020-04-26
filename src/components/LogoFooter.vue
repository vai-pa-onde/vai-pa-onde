<template>
  <footer class="logo-footer">
    <div class="logo-footer__content">
      <div class="logo-footer__content__logo">
        <logo />
        <div class="logo-footer__content__logo__social-medias">
          <a href="https://www.instagram.com/vaipaonde.com.br/" target="_blank"><p>@vaipaonde.com.br</p></a>
          <a href="mailto:contato.vaipaonde@gmail.com" target="_top"><p>contato.vaipaonde@gmail.com</p></a>
        </div>
      </div>
      <suggestion-modal outlined />
    </div>
  </footer>
</template>

<script>
export default {
  name: 'logo-footer'
}
</script>

<style lang="scss" scoped>
.logo-footer {
  @extend %side-padding;
  display: flex;
  height: 190px;
  padding-top: 24px;
  background-color: black;

  &__content {
    width: 100%;
    height: min-content;
    display: flex;
    justify-content: space-between;

    &__logo {
      & > .logo {
        font-size: 34px;
      }

      &__social-medias {
        margin-top: 18px;

        & > a {
          color: white;
          text-decoration: none;
          display: block;
          height: 18px;
          padding-left: 22px;
          margin-top: 8px;
          background: {
            image: url('~@/assets/instagram.svg');
            size: 18px 18px;
            repeat: no-repeat;
          }

          & > p {
            line-height: 16px;
            font: {
              family: 'Play';
              size: 14px;
            }
          }

          &:last-child {
            background-image: url('~@/assets/mail.svg');
          }
        }
      }
    }
  }

  @media screen and (max-width: 992px) {
    height: auto;

    &__content {
      padding: 20px 0 40px 0;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      &__logo {
        margin-bottom: 24px;

        & > .logo {
          font-size: 30px;
        }

        &__social-medias {
          display: flex;
          justify-content: center;
          margin-top: 24px;

          & > a {
            height: 24px;
            padding-left: 24px;
            margin: 0 6px;
            background-size: 24px 24px;

            & > p {
              display: none;
            }
          }
        }
      }
    }
  }
}
</style>
