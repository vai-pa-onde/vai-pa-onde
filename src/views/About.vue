<template>
  <div class="about">
    <current-section-indicator />
    <div class="about__main">
      <h1>Vim pa onde?</h1>
      <div class="about__main__content">
        <colors-stripe />
        <div class="about__main__content__text">
          <p>
            Como você tem lidado com <b>tantas informações e conteúdos online?</b><br/>
            Tá afim de aproveitar um tempinho em casa para aprender uma coisa ou para se especializar em algo? E quer fazer isso sem gastar um centavo?
          </p>

          <h2>Estamos aqui pra isso!</h2>
          <p>
            O portal <b>Vai pa Onde</b> está organizando todos (ou quase todos) os cursos onlines e gratuitos que encontramos na internet!
            Um luxo né, amores? Tem <b>cursos</b> profissionais de marketing, pra quem quer aprender a desenvolver e até pra quem sempre quis aprender a desenhar!
          </p>

          <h2>Quer nos ajudar?</h2>
          <p>
            Somos uma iniciativa coletiva. Você conhece ou oferece algum curso online, canal do youtube ou podcast
            que colabore para o aprendizado e compartilhamento de conhecimento? <suggestion-modal text />.
          </p>
          <p>
            Não é pra alienar, nem surtar! Vai pa onde? #Ficaemcasa e vem com a gente!
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import config from '@/config'

export default {
  name: 'about',
  metaInfo: {
    title: 'Vai pa onde? | Sobre',
    meta: [
      { vmid: 'description', name: 'description', content: config.defaultDescription },
      { vmid: 'og:description', name: 'og:description', content: config.defaultDescription }
    ],
    link: [
      { rel: 'canonical', href: `https://vaipaonde.com.br/sobre` }
    ]
  }
}
</script>

<style lang="scss" scoped>
.about {
  display: flex;
  flex-direction: column;
  margin-top: 16px;
  flex-grow: 1;

  & > .separator-bar {
    margin-top: 0;
  }

  &__main {
    @extend %side-padding;
    background-color: black;
    flex-grow: 1;
    border-top: 1px solid rgba(255, 255, 255, 0.5);
    border-bottom: 1px solid rgba(255, 255, 255, 0.5);

    & > h1 {
      padding-top: 12px;
      margin-bottom: 42px;
      text-transform: uppercase;
      line-height: 130px;
      font: {
        size: 112px;
        weight: bold;
      }
    }

    &__content {
      display: flex;
      margin-bottom: 24px;

      & > .colors-stripe {
        flex-direction: column-reverse;
        height: 400px;
        min-width: 22px;
        width: 22px;
        margin-left: 20%;
      }

      &__text {
        margin: 0 36px;

        & > p {
          line-height: 27px;
          font-size: 24px;
          margin-bottom: 24px;

          & > b {
            font-weight: bold;
          }

          & > .suggestion-modal {
            display: inline;
            color: #0089D3;
          }
        }

        & > h2 {
          line-height: 46px;
          font: {
            size: 34px;
            weight: bold;
          }
        }
      }
    }

    @media screen and (max-width: 768px) {
      & > h1 {
        font-size: 82px;
        line-height: 90px;
        margin-bottom: 18px;
      }

      &__content {
        & > .colors-stripe {
          height: 400px;
          min-width: 10px;
          width: 10px;
          margin-left: 0;
        }

        &__text {
          margin: 0 24px;

          & > p {
            font-size: 18px;
            line-height: 21px;
            margin-bottom: 18px;
          }

          & > h2 {
            line-height: 27px;
            font-size: 24px;
          }
        }
      }
    }
  }

  @include breakpoint('large') {
    margin-top: 32px;;
  }
}
</style>
